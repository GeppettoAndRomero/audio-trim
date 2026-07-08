/**
 * Peak downsampling for the waveform canvas. Pure PCM math (no DOM) — unit tested
 * directly. A decoded file can have millions of samples; the canvas only has a few
 * hundred/thousand pixel columns, so each column gets the min/max sample of its
 * bucket (a standard "peak" waveform, not a smoothed/averaged one).
 */

export interface PeakData {
  min: Float32Array;
  max: Float32Array;
}

/** Downsample `samples` to `columns` (min, max) peak pairs. */
export function computePeaks(samples: Float32Array, columns: number): PeakData {
  const n = Math.max(0, Math.floor(columns));
  const min = new Float32Array(n);
  const max = new Float32Array(n);
  if (n === 0 || samples.length === 0) return { min, max };

  const bucketSize = samples.length / n;
  for (let i = 0; i < n; i++) {
    const start = Math.floor(i * bucketSize);
    const end = Math.min(samples.length, Math.max(start + 1, Math.floor((i + 1) * bucketSize)));
    let lo = samples[start];
    let hi = samples[start];
    for (let j = start + 1; j < end; j++) {
      const v = samples[j];
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
    min[i] = lo;
    max[i] = hi;
  }
  return { min, max };
}
