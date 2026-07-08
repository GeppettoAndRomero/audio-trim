import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { waitReady, dropSample, dropCorrupt, convert, setRangeByTime, decodedDurationOf } from './_helpers';

// The fixture (tests/fixtures/audio/sample.wav) is a synthetic 5.000s, 44.1kHz mono
// tone, generated at test-fixture-authoring time — its duration is exactly known,
// which lets the sub-range test assert an actual output duration, not just "a file
// was produced".
const FIXTURE_DURATION_SEC = 5.0;

test.describe('audio trim', () => {
  test('trims the full clip into an MP3 in the browser, no upload', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const u = req.url();
      if (!u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
    });
    await page.goto('/audio-trim/');
    await waitReady(page);
    const download = await convert(page);
    expect(download.suggestedFilename()).toMatch(/-trimmed\.mp3$/);
    const buf = readFileSync((await download.path()) as string);
    expect(buf.length).toBeGreaterThan(100);
    // MP3 frame sync (0xFFE) or ID3
    const ok = buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0;
    const id3 = buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33;
    expect(ok || id3).toBe(true);
    expect(external, external.join(', ')).toHaveLength(0);
  });

  test('renders a waveform after decoding a file', async ({ page }) => {
    await page.goto('/audio-trim/');
    await waitReady(page);
    await dropSample(page);

    // The canvas is sized/drawn from a ResizeObserver callback, which can land a
    // frame or two after the handles become visible (seen on WebKit) -- poll for it
    // instead of asserting on a single synchronous snapshot.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return false;
            const ctx = (canvas as HTMLCanvasElement).getContext('2d');
            if (!ctx) return false;
            const { width, height } = canvas as HTMLCanvasElement;
            if (width === 0 || height === 0) return false;
            const { data } = ctx.getImageData(0, 0, width, height);
            for (let i = 3; i < data.length; i += 4) if (data[i] > 0) return true; // any drawn (non-transparent) pixel
            return false;
          }),
        { timeout: 5_000 }
      )
      .toBe(true);
  });

  test('trims a selected sub-range and the decoded output has the correct duration', async ({ page }) => {
    await page.goto('/audio-trim/');
    await waitReady(page);
    await dropSample(page);

    // Fixture is 5.000s. Select [1.000, 3.000) -> expect ~2.000s of output.
    await setRangeByTime(page, 'Start', 'End', '00:01.000', '00:03.000');

    const readout = await page.locator('#selected-duration').innerText();
    expect(readout).toContain('00:02.000');

    const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
    await page.click('#trim-action');
    const download = await downloadPromise;
    const filePath = (await download.path()) as string;
    const buf = readFileSync(filePath);
    expect(buf.length).toBeGreaterThan(100);

    const duration = await decodedDurationOf(page, filePath);
    // MP3 encoding adds a little encoder delay/padding at frame boundaries, so allow
    // generous slack while still confirming this is a ~2s clip, not the full 5s file.
    expect(Math.abs(duration - 2.0)).toBeLessThan(0.3);
    expect(duration).toBeLessThan(FIXTURE_DURATION_SEC - 1);
  });

  test('reports a decode error for a corrupt/unsupported file, without crashing', async ({ page }) => {
    await page.goto('/audio-trim/');
    await waitReady(page);
    await dropCorrupt(page);
    await expect(page.locator('.error-toast')).toBeVisible();
    // The tool should not be stuck showing a broken file — the drop zone is back.
    await expect(page.locator('#file-input')).toBeAttached();
  });

  test('disables Trim when the start is not before the end', async ({ page }) => {
    await page.goto('/audio-trim/');
    await waitReady(page);
    await dropSample(page);
    await setRangeByTime(page, 'Start', 'End', '00:03.000', '00:03.000');
    await expect(page.locator('#trim-action')).toBeDisabled();
  });
});
