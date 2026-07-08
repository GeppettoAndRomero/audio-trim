import { describe, it, expect } from 'vitest';
import { computePeaks } from '@/utils/waveform';

describe('computePeaks', () => {
  it('returns empty/zeroed arrays for zero columns or empty input', () => {
    const a = computePeaks(new Float32Array([1, 2, 3]), 0);
    expect(a.min.length).toBe(0);
    expect(a.max.length).toBe(0);

    const b = computePeaks(new Float32Array([]), 5);
    expect(b.min.length).toBe(5);
    expect(Array.from(b.min)).toEqual([0, 0, 0, 0, 0]);
    expect(Array.from(b.max)).toEqual([0, 0, 0, 0, 0]);
  });

  it('captures the min/max sample per bucket', () => {
    // 4 samples -> 2 columns: bucket0 = [0.5, -0.2], bucket1 = [0.9, -0.9]
    const samples = new Float32Array([0.5, -0.2, 0.9, -0.9]);
    const { min, max } = computePeaks(samples, 2);
    expect(max[0]).toBeCloseTo(0.5);
    expect(min[0]).toBeCloseTo(-0.2);
    expect(max[1]).toBeCloseTo(0.9);
    expect(min[1]).toBeCloseTo(-0.9);
  });

  it('handles more columns than samples without throwing', () => {
    const samples = new Float32Array([0.3, -0.3]);
    const { min, max } = computePeaks(samples, 5);
    expect(min.length).toBe(5);
    expect(max.length).toBe(5);
  });

  it('produces one peak pair per column for a larger buffer', () => {
    const samples = new Float32Array(1000).map((_, i) => Math.sin(i / 10));
    const { min, max } = computePeaks(samples, 100);
    expect(min.length).toBe(100);
    expect(max.length).toBe(100);
    for (let i = 0; i < 100; i++) expect(max[i]).toBeGreaterThanOrEqual(min[i]);
  });
});
