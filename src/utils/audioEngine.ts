/**
 * Trim an audio clip to a start/end range, in the browser. Web Audio decodes the
 * file, the caller picks a sample range (index-range slicing — no signal analysis),
 * and lamejs (pure JS) re-encodes the kept range to MP3. No WASM, no server.
 */
import { Mp3Encoder } from '@breezystack/lamejs';
import { AppError } from './appError';

export interface DecodedAudio {
  mono: Float32Array;
  sampleRate: number;
  duration: number;
}

/** Decode a file to mono PCM via the browser's Web Audio API. */
export async function decodeAudioFile(file: File): Promise<DecodedAudio> {
  const arrayBuffer = await file.arrayBuffer();
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  let audio: AudioBuffer;
  try {
    audio = await ctx.decodeAudioData(arrayBuffer);
  } catch {
    await ctx.close();
    throw new AppError('errAudioDecode');
  }
  await ctx.close();

  const len = audio.length;
  const channels = audio.numberOfChannels;
  const mono = new Float32Array(len);
  for (let c = 0; c < channels; c++) {
    const data = audio.getChannelData(c);
    for (let i = 0; i < len; i++) mono[i] += data[i] / channels;
  }
  return { mono, sampleRate: audio.sampleRate, duration: audio.duration };
}

/**
 * Convert a start/end range in seconds to a [start, end) sample range, clamped to
 * the buffer's bounds. Throws `errZeroLengthSelection` if the range is empty.
 * Pure — no Web Audio, no lamejs — so it's unit-testable on its own.
 */
export function computeSampleRange(
  totalSamples: number,
  sampleRate: number,
  startSec: number,
  endSec: number
): { start: number; end: number } {
  const start = Math.min(totalSamples, Math.max(0, Math.round(startSec * sampleRate)));
  const end = Math.min(totalSamples, Math.max(0, Math.round(endSec * sampleRate)));
  if (end <= start) throw new AppError('errZeroLengthSelection');
  return { start, end };
}

/** Encode a mono PCM range (Float32, -1..1) to MP3 with lamejs. */
export function encodeMonoToMp3(mono: Float32Array, sampleRate: number): Blob {
  if (mono.length === 0) throw new AppError('errZeroLengthSelection');

  const int16 = new Int16Array(mono.length);
  for (let i = 0; i < mono.length; i++) {
    const v = mono[i];
    int16[i] = v < 0 ? Math.max(-32768, v * 32768) : Math.min(32767, v * 32767);
  }

  const encoder = new Mp3Encoder(1, sampleRate, 128);
  const chunks: Uint8Array[] = [];
  const block = 1152;
  for (let i = 0; i < int16.length; i += block) {
    const buf = encoder.encodeBuffer(int16.subarray(i, i + block));
    if (buf.length > 0) chunks.push(buf);
  }
  const end = encoder.flush();
  if (end.length > 0) chunks.push(end);
  return new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
}

/** Slice `decoded` to [startSec, endSec) and encode the result to MP3. */
export function trimToMp3(decoded: DecodedAudio, startSec: number, endSec: number): Blob {
  const { start, end } = computeSampleRange(decoded.mono.length, decoded.sampleRate, startSec, endSec);
  return encodeMonoToMp3(decoded.mono.subarray(start, end), decoded.sampleRate);
}
