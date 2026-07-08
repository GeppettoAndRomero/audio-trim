/**
 * Audio file validation — extension/MIME allow-list, matched to audio-silence-remover
 * (the sibling audio tool) so the two tools accept the same set of formats.
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const ALLOWED_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac', '.webm'];

/** The `accept` attribute for the file input, and the drag/drop file filter. */
export const ACCEPT_ATTR = 'audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.webm';

/** True if the file looks like audio, by extension or by MIME type. */
export function isAudioFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext)) || file.type.startsWith('audio/');
}

/** Validate a single file before it is handed to the decode pipeline. */
export function validateFile(file: File): ValidationResult {
  if (!isAudioFile(file)) {
    return { valid: false, error: `Not an audio file (${file.name}).` };
  }
  return { valid: true };
}
