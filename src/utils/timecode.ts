/**
 * mm:ss.ms timecode parsing/formatting for the range inputs. Pure, no DOM — unit
 * tested directly. Kept separate from the waveform/engine so the format is easy to
 * change without touching decode/encode logic.
 */

/** Format a number of seconds as `mm:ss.mmm`, zero-padded (e.g. 83.4 -> '01:23.400'). */
export function formatTimecode(totalSeconds: number): string {
  const clamped = Number.isFinite(totalSeconds) ? Math.max(0, totalSeconds) : 0;
  let minutes = Math.floor(clamped / 60);
  let seconds = Math.floor(clamped - minutes * 60);
  let ms = Math.round((clamped - minutes * 60 - seconds) * 1000);
  if (ms >= 1000) {
    ms -= 1000;
    seconds += 1;
  }
  if (seconds >= 60) {
    seconds -= 60;
    minutes += 1;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

/**
 * Parse a timecode typed by the user. Accepts `mm:ss`, `mm:ss.ms`, or a plain
 * (optionally fractional) number of seconds. Returns null if it can't be parsed.
 */
export function parseTimecode(input: string): number | null {
  const s = input.trim();
  if (s === '') return null;

  const withMinutes = /^(\d+):([0-5]?\d)(?:\.(\d{1,3}))?$/.exec(s);
  if (withMinutes) {
    const minutes = Number(withMinutes[1]);
    const seconds = Number(withMinutes[2]);
    const ms = withMinutes[3] ? Number(withMinutes[3].padEnd(3, '0')) : 0;
    return minutes * 60 + seconds + ms / 1000;
  }

  const secondsOnly = /^(\d+)(?:\.(\d{1,3}))?$/.exec(s);
  if (secondsOnly) {
    const seconds = Number(secondsOnly[1]);
    const ms = secondsOnly[2] ? Number(secondsOnly[2].padEnd(3, '0')) : 0;
    return seconds + ms / 1000;
  }

  return null;
}
