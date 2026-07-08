/**
 * ConversionManager (audio-trim).
 * 音声を 1 つ受け取り、選択した開始/終了の範囲だけを MP3 として書き出す。
 * Web Audio でデコード → 範囲選択（波形 + ドラッグハンドル / 数値入力）→ lamejs で
 * MP3 化（メインスレッド、サーバー不要）。
 */

import { useState, useEffect, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { ErrorToast } from './ErrorToast';
import { WaveformSelector, type RangeValue } from './WaveformSelector';
import { decodeAudioFile, trimToMp3, type DecodedAudio } from '@/utils/audioEngine';
import { computePeaks, type PeakData } from '@/utils/waveform';
import { formatTimecode, parseTimecode } from '@/utils/timecode';
import { isAudioFile, ACCEPT_ATTR } from '@/utils/fileValidation';
import { resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

const PEAK_COLUMNS = 800;
// Below this, treat the selection as empty (disables Trim). Deliberately tiny —
// the only job here is to reject a genuinely zero/negative-length range; anything
// resembling a real selection should stay editable and enabled.
const MIN_SELECTION_SEC = 0.001;

interface ErrorToastItem {
  id: string;
  message: string;
}

interface ConversionManagerProps {
  locale?: string;
}

/** Controlled mm:ss.ms text input — free typing until blur/Enter, then parsed and committed. */
function TimeInput({ seconds, onCommit, ariaLabel }: { seconds: number; onCommit: (sec: number) => void; ariaLabel: string }) {
  const [draft, setDraft] = useState(() => formatTimecode(seconds));
  useEffect(() => setDraft(formatTimecode(seconds)), [seconds]);

  const commit = () => {
    const parsed = parseTimecode(draft);
    if (parsed === null) {
      setDraft(formatTimecode(seconds));
      return;
    }
    onCommit(parsed);
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      class="num"
      aria-label={ariaLabel}
      value={draft}
      onInput={(e) => setDraft(e.currentTarget.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          commit();
          e.currentTarget.blur();
        }
      }}
      style="width: 8rem; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg); color: var(--color-text);"
    />
  );
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [file, setFile] = useState<File | null>(null);
  const [decoded, setDecoded] = useState<DecodedAudio | null>(null);
  const [peaks, setPeaks] = useState<PeakData | null>(null);
  const [range, setRange] = useState<RangeValue>({ startSec: 0, endSec: 0 });
  const [decoding, setDecoding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const loadFile = useCallback(
    async (f: File) => {
      setFile(f);
      setDecoded(null);
      setPeaks(null);
      setDecoding(true);
      try {
        const d = await decodeAudioFile(f);
        setDecoded(d);
        setPeaks(computePeaks(d.mono, PEAK_COLUMNS));
        setRange({ startSec: 0, endSec: d.duration });
      } catch (error) {
        setFile(null);
        showErrorToast(resolveErrorMessage(error, t));
      } finally {
        setDecoding(false);
      }
    },
    [showErrorToast, t]
  );

  const handleFiles = useCallback(
    (files: File[]) => {
      const audio = files.find(isAudioFile);
      if (!audio) {
        if (files.length > 0) showErrorToast(t.errUnsupported.replace('{name}', files[0].name));
      } else {
        void loadFile(audio);
      }
      window.dispatchEvent(new CustomEvent('filesProcessed'));
    },
    [showErrorToast, t, loadFile]
  );

  useEffect(() => {
    const handler = (e: Event) => handleFiles((e as CustomEvent<File[]>).detail);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const selectionValid = decoded != null && range.endSec - range.startSec > MIN_SELECTION_SEC;

  const handleTrim = useCallback(async () => {
    if (!file || !decoded || busy || !selectionValid) return;
    setBusy(true);
    try {
      const blob = trimToMp3(decoded, range.startSec, range.endSec);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.[^.]+$/, '') + '-trimmed.mp3';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast(resolveErrorMessage(error, t));
    } finally {
      setBusy(false);
    }
  }, [file, decoded, busy, selectionValid, range, showErrorToast, t]);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h3 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h3>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">🎵</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept={ACCEPT_ATTR}
            onChange={(e) => {
              handleFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        {file && decoding && (
          <p style="font-size: var(--fs-2); color: var(--color-subtle);">{t.decoding}</p>
        )}

        {file && decoded && peaks && (
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <strong style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{file.name}</strong>

            <WaveformSelector peaks={peaks} duration={decoded.duration} value={range} onChange={setRange} locale={locale} />

            <div style="display: flex; gap: var(--space-4); flex-wrap: wrap; align-items: flex-end;">
              <label style="display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--fs-2);">
                {t.startLabel}
                <TimeInput
                  seconds={range.startSec}
                  ariaLabel={t.startLabel}
                  onCommit={(sec) => setRange((r) => ({ startSec: Math.min(Math.max(0, sec), decoded.duration), endSec: r.endSec }))}
                />
              </label>
              <label style="display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--fs-2);">
                {t.endLabel}
                <TimeInput
                  seconds={range.endSec}
                  ariaLabel={t.endLabel}
                  onCommit={(sec) => setRange((r) => ({ startSec: r.startSec, endSec: Math.min(Math.max(0, sec), decoded.duration) }))}
                />
              </label>
              <div id="selected-duration" style="font-size: var(--fs-2); color: var(--color-subtle);">
                {t.selectedDuration}: <span class="num">{formatTimecode(Math.max(0, range.endSec - range.startSec))}</span>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button id="trim-action" onClick={handleTrim} disabled={!selectionValid || busy} class="app-button app-button--primary">
                {busy ? (t.processing ?? 'Processing…') : (t.trimButton ?? 'Trim')}
              </button>
            </div>
          </div>
        )}
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
