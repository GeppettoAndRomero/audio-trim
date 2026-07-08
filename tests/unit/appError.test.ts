import { describe, it, expect } from 'vitest';
import { AppError, resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

describe('resolveErrorMessage', () => {
  it('maps codes (incl. thrown-string codes) to localized strings', () => {
    expect(resolveErrorMessage('errAudioDecode', ui.en)).toBe(
      "Could not decode this audio file. It may be corrupt or in a format your browser doesn't support."
    );
    expect(resolveErrorMessage('errAudioDecode', ui.ja)).toBe(
      'この音声ファイルをデコードできませんでした。壊れているか、対応していない形式の可能性があります。'
    );
    expect(resolveErrorMessage(new AppError('errZeroLengthSelection'), ui.de)).toBe(
      'Wähle einen Bereich mit einer Länge größer als null, bevor du zuschneidest.'
    );
  });

  it('maps a forwarded plain Error by its .message code too', () => {
    expect(resolveErrorMessage(new Error('errZeroLengthSelection'), ui.en)).toBe(ui.en.errZeroLengthSelection);
  });

  it('falls back to the localized generic message for unmapped English/undefined errors', () => {
    expect(resolveErrorMessage('Failed to get 2D context (Canvas)', ui.zh)).toBe(ui.zh.errConversionFailed);
    expect(resolveErrorMessage(undefined, ui.es)).toBe(ui.es.errConversionFailed);
  });

  it('every locale defines the mapped codes', () => {
    for (const loc of ['en', 'ja', 'zh', 'de', 'es'] as const)
      for (const c of ['errAudioDecode', 'errZeroLengthSelection', 'errConversionFailed', 'errUnsupported'])
        expect((ui as any)[loc][c], `${loc}.${c}`).toBeTruthy();
  });
});
