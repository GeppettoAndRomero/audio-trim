/**
 * Waveform + draggable start/end range selector. A plain <canvas> draws the peak
 * waveform (see @/utils/waveform), and two overlaid handles (role="slider") let the
 * user drag or keyboard-nudge the selected range. No charting library — the canvas
 * draw is a simple min/max bar per column.
 */
import { useEffect, useRef } from 'preact/hooks';
import type { PeakData } from '@/utils/waveform';
import { formatTimecode } from '@/utils/timecode';
import { ui } from '@/i18n/ui';

const MIN_GAP_SEC = 0.01;

export interface RangeValue {
  startSec: number;
  endSec: number;
}

interface WaveformSelectorProps {
  peaks: PeakData;
  duration: number;
  value: RangeValue;
  onChange: (next: RangeValue) => void;
  locale?: string;
}

export function WaveformSelector({ peaks, duration, value, onChange, locale = 'en' }: WaveformSelectorProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const n = peaks.max.length;
      if (n === 0 || width === 0) return;
      const mid = height / 2;
      const barWidth = width / n;
      const style = getComputedStyle(container).getPropertyValue('--color-primary').trim();
      ctx.fillStyle = style || '#4f46e5';
      for (let i = 0; i < n; i++) {
        const x = i * barWidth;
        const top = mid - peaks.max[i] * mid;
        const bottom = mid - peaks.min[i] * mid;
        ctx.fillRect(x, top, Math.max(1, barWidth - 0.5), Math.max(1, bottom - top));
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, [peaks]);

  const pct = (sec: number) => (duration > 0 ? Math.min(1, Math.max(0, sec / duration)) * 100 : 0);

  const secAtClientX = (clientX: number): number => {
    const rect = containerRef.current!.getBoundingClientRect();
    const frac = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
    return Math.min(duration, Math.max(0, frac * duration));
  };

  const dragHandlers = (which: 'start' | 'end') => ({
    onPointerDown: (e: any) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: any) => {
      if (e.buttons === 0) return;
      const sec = secAtClientX(e.clientX);
      if (which === 'start') onChange({ startSec: Math.min(sec, value.endSec - MIN_GAP_SEC), endSec: value.endSec });
      else onChange({ startSec: value.startSec, endSec: Math.max(sec, value.startSec + MIN_GAP_SEC) });
    },
    onKeyDown: (e: any) => {
      const step = e.shiftKey ? 1 : 0.1;
      let next = which === 'start' ? value.startSec : value.endSec;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next -= step;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next += step;
      else if (e.key === 'Home') next = which === 'start' ? 0 : value.startSec + MIN_GAP_SEC;
      else if (e.key === 'End') next = which === 'start' ? value.endSec - MIN_GAP_SEC : duration;
      else return;
      e.preventDefault();
      if (which === 'start') onChange({ startSec: Math.min(Math.max(0, next), value.endSec - MIN_GAP_SEC), endSec: value.endSec });
      else onChange({ startSec: value.startSec, endSec: Math.max(Math.min(duration, next), value.startSec + MIN_GAP_SEC) });
    },
  });

  return (
    <div
      role="group"
      aria-label={t.rangeSelectorAria}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '120px',
          width: '100%',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          touchAction: 'none',
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }} />

        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${pct(value.startSec)}%`,
            width: `${Math.max(0, pct(value.endSec) - pct(value.startSec))}%`,
            background: 'var(--color-primary-alpha)',
            pointerEvents: 'none',
          }}
        />

        <div
          {...dragHandlers('start')}
          role="slider"
          tabIndex={0}
          aria-label={t.startHandleAria}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={value.startSec}
          aria-valuetext={formatTimecode(value.startSec)}
          class="waveform-handle"
          style={{ left: `${pct(value.startSec)}%` }}
        />
        <div
          {...dragHandlers('end')}
          role="slider"
          tabIndex={0}
          aria-label={t.endHandleAria}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={value.endSec}
          aria-valuetext={formatTimecode(value.endSec)}
          class="waveform-handle"
          style={{ left: `${pct(value.endSec)}%` }}
        />
      </div>

      <style>{`
        .waveform-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12px;
          margin-left: -6px;
          background: var(--color-primary);
          border-radius: 3px;
          cursor: ew-resize;
          touch-action: none;
        }
        .waveform-handle:focus-visible {
          outline: 2px solid var(--color-focus, var(--color-primary));
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
