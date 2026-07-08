import { describe, it, expect } from 'vitest';
import { isAudioFile, validateFile, ALLOWED_EXTENSIONS } from '@/utils/fileValidation';

function makeFile(name: string, type = ''): File {
  return new File(['x'], name, { type });
}

describe('isAudioFile', () => {
  it('accepts every allowed extension', () => {
    for (const ext of ALLOWED_EXTENSIONS) expect(isAudioFile(makeFile(`clip${ext}`))).toBe(true);
  });

  it('accepts any audio/* MIME type regardless of extension', () => {
    expect(isAudioFile(makeFile('clip.bin', 'audio/x-custom'))).toBe(true);
  });

  it('rejects non-audio files', () => {
    expect(isAudioFile(makeFile('photo.png', 'image/png'))).toBe(false);
    expect(isAudioFile(makeFile('notes.txt'))).toBe(false);
  });
});

describe('validateFile', () => {
  it('passes audio files and fails everything else with a message', () => {
    expect(validateFile(makeFile('song.mp3')).valid).toBe(true);
    const result = validateFile(makeFile('photo.png', 'image/png'));
    expect(result.valid).toBe(false);
    expect(result.error).toContain('photo.png');
  });
});
