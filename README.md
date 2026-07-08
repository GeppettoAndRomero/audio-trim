# audio-trim

Trim an audio clip to a start/end range and download the result, entirely in your
browser. Files are processed on your device and never uploaded. Open source, works
offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

The file is decoded with the browser's Web Audio API (`decodeAudioData`), downsampled
to a peak waveform for the canvas visualization, sliced to the selected sample range,
and the kept audio is re-encoded to MP3 with [lamejs](https://github.com/zhuker/lamejs)
(pure JavaScript, no WebAssembly). The whole pipeline runs client-side — there is no
server component, so your files have no path off your device.

## Features

- Drag a start/end range directly on the waveform, or type exact `mm:ss.ms` times
- Live duration readout for the selected range
- Trims to MP3, keeping only the selected range
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. Decode, waveform and encode all run on the main
thread (no worker) — trimming is index-range slicing, not signal analysis, so it is
light enough that a worker isn't needed.

## Browser support

Works in current Chrome, Edge, Firefox and Safari. Uses `AudioContext.decodeAudioData`
(with the `webkitAudioContext` fallback for older Safari) and pointer events for the
waveform drag handles.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
