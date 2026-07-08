import { describe, it, expect } from 'vitest';
import { formatTimecode, parseTimecode } from '@/utils/timecode';

describe('formatTimecode', () => {
  it('formats whole seconds', () => {
    expect(formatTimecode(0)).toBe('00:00.000');
    expect(formatTimecode(5)).toBe('00:05.000');
  });

  it('formats minutes and fractional seconds', () => {
    expect(formatTimecode(83.4)).toBe('01:23.400');
  });

  it('carries a rounded-up millisecond into the next second/minute', () => {
    expect(formatTimecode(59.9996)).toBe('01:00.000');
  });

  it('clamps negative or non-finite input to zero', () => {
    expect(formatTimecode(-5)).toBe('00:00.000');
    expect(formatTimecode(NaN)).toBe('00:00.000');
  });
});

describe('parseTimecode', () => {
  it('parses mm:ss.ms', () => {
    expect(parseTimecode('01:23.400')).toBeCloseTo(83.4, 5);
  });

  it('parses mm:ss without a fraction', () => {
    expect(parseTimecode('01:23')).toBe(83);
  });

  it('parses a plain (optionally fractional) number of seconds', () => {
    expect(parseTimecode('5.5')).toBe(5.5);
    expect(parseTimecode('12')).toBe(12);
  });

  it('rejects unparseable or out-of-range input', () => {
    expect(parseTimecode('')).toBeNull();
    expect(parseTimecode('   ')).toBeNull();
    expect(parseTimecode('abc')).toBeNull();
    expect(parseTimecode('01:99')).toBeNull();
  });

  it('round-trips through formatTimecode', () => {
    const sec = 125.25;
    expect(parseTimecode(formatTimecode(sec))).toBeCloseTo(sec, 3);
  });
});
