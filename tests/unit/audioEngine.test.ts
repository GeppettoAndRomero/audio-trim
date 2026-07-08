import { describe, it, expect } from 'vitest';
import { computeSampleRange, encodeMonoToMp3, trimToMp3, type DecodedAudio } from '@/utils/audioEngine';
import { AppError } from '@/utils/appError';

describe('computeSampleRange', () => {
  it('converts a start/end in seconds to sample indices', () => {
    const r = computeSampleRange(44100 * 10, 44100, 1, 3);
    expect(r.start).toBe(44100);
    expect(r.end).toBe(44100 * 3);
  });

  it('clamps out-of-bounds seconds to the buffer length', () => {
    const r = computeSampleRange(1000, 44100, -5, 1000);
    expect(r.start).toBe(0);
    expect(r.end).toBe(1000);
  });

  it('throws errZeroLengthSelection when end <= start', () => {
    expect(() => computeSampleRange(1000, 44100, 2, 2)).toThrow(AppError);
    try {
      computeSampleRange(1000, 44100, 2, 1);
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).code).toBe('errZeroLengthSelection');
    }
  });
});

describe('encodeMonoToMp3', () => {
  it('encodes a synthetic tone to a non-empty MP3 blob', () => {
    const sampleRate = 44100;
    const n = Math.round(sampleRate * 0.5);
    const mono = new Float32Array(n);
    for (let i = 0; i < n; i++) mono[i] = Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 0.5;

    const blob = encodeMonoToMp3(mono, sampleRate);
    expect(blob.size).toBeGreaterThan(100);
    expect(blob.type).toBe('audio/mpeg');
  });

  it('throws errZeroLengthSelection for an empty range', () => {
    expect(() => encodeMonoToMp3(new Float32Array(0), 44100)).toThrow(AppError);
  });
});

describe('trimToMp3', () => {
  function makeDecoded(seconds: number, sampleRate = 44100): DecodedAudio {
    const n = Math.round(seconds * sampleRate);
    const mono = new Float32Array(n);
    for (let i = 0; i < n; i++) mono[i] = Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 0.5;
    return { mono, sampleRate, duration: seconds };
  }

  it('slices the decoded buffer to the requested range and encodes it', () => {
    const decoded = makeDecoded(5);
    const blob = trimToMp3(decoded, 1, 3);
    expect(blob.size).toBeGreaterThan(100);
    expect(blob.type).toBe('audio/mpeg');
  });

  it('throws errZeroLengthSelection for an empty/inverted range', () => {
    const decoded = makeDecoded(5);
    expect(() => trimToMp3(decoded, 3, 3)).toThrow(AppError);
    expect(() => trimToMp3(decoded, 3, 1)).toThrow(AppError);
  });
});
