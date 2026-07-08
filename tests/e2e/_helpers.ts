import { type Page, type Download } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const WAV_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/audio/sample.wav', import.meta.url))
).toString('base64');

const CORRUPT_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/audio/corrupt.mp3', import.meta.url))
).toString('base64');

export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** Dispatch a `filesDropped` event carrying the given base64 file, as GlobalDropZone would. */
async function dropFile(page: Page, base64: string, name: string, type: string) {
  await page.evaluate(
    ({ b64, name, type }) => {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      window.dispatchEvent(
        new CustomEvent('filesDropped', { detail: [new File([bytes], name, { type })] })
      );
    },
    { b64: base64, name, type }
  );
}

/** Drop the 5-second sample tone and wait for the waveform (decode) to be ready. */
export async function dropSample(page: Page) {
  await dropFile(page, WAV_B64, 'sample.wav', 'audio/wav');
  await page.locator('#trim-action').waitFor({ state: 'visible' });
}

/** Drop a file with an audio-like name but bytes that cannot be decoded. */
export async function dropCorrupt(page: Page) {
  await dropFile(page, CORRUPT_B64, 'corrupt.mp3', 'audio/mpeg');
}

/** Drop the sample and trim it, keeping the default (full-length) selection. */
export async function convert(page: Page): Promise<Download> {
  await dropSample(page);
  const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  await page.click('#trim-action');
  return downloadPromise;
}

/** Set the start/end range via the numeric mm:ss.ms inputs and commit both. */
export async function setRangeByTime(page: Page, startLabel: string, endLabel: string, startText: string, endText: string) {
  const startInput = page.getByLabel(startLabel, { exact: true });
  await startInput.fill(startText);
  await startInput.blur();
  const endInput = page.getByLabel(endLabel, { exact: true });
  await endInput.fill(endText);
  await endInput.blur();
}

/** Decode a downloaded MP3 (already on disk) back to PCM in-browser and return its duration (seconds). */
export async function decodedDurationOf(page: Page, filePath: string): Promise<number> {
  const b64 = readFileSync(filePath).toString('base64');
  return page.evaluate(async (base64) => {
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const buffer = await ctx.decodeAudioData(bytes.buffer);
    const duration = buffer.duration;
    await ctx.close();
    return duration;
  }, b64);
}
