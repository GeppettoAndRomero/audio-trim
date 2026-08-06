import type { ToolContent } from './types';

// audio-trim.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Trim an audio clip — in your browser, no upload | runlocally',
    description:
      'Cut an audio file down to a start and end point directly in your browser. Drop an MP3, WAV or M4A, drag the range on the waveform (or type exact times), and get a trimmed MP3. Nothing is uploaded. Open source, works offline.',
    ogTitle: 'Trim an audio clip — in your browser, no upload',
    ogDescription:
      'Cut an audio file down to a start and end point and get a trimmed MP3, all in your browser. Nothing is uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Trim an audio clip',
    tagline:
      'Cut an audio file down to a start and end point and get a trimmed MP3 — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Trim audio, in your browser',
    paras: [
      'This tool cuts an audio file down to a range you choose, then gives you an MP3 of just that range. Drop in an MP3, WAV, M4A or similar file — it is handy for pulling a clip out of a longer recording, cutting a sample or ringtone, or removing dead air from the start or end without touching anything else.',
      'A waveform shows the shape of the file so you can see where to cut. Drag the two handles to set the start and end, or type exact mm:ss.ms times if you need more precision than dragging allows. The duration of the selected range updates as you adjust it.',
      'Everything runs on your device. The browser\'s Web Audio API decodes the file, and lamejs — pure JavaScript — re-encodes the selected range to MP3. There is no WebAssembly and no server involved.',
    ],
  },

  privacy: {
    h2: 'Why your audio stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The whole process — decoding, drawing the waveform, cutting and re-encoding — runs in your browser.',
      'The page is served as static files and makes no request carrying your audio.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while it runs — no request carries your file.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Drop an audio file',
        p: 'Click to choose a file, or drop one anywhere on the page. MP3, WAV, M4A and other common formats work.',
      },
      {
        h3: 'Set the start and end',
        p: 'Drag the two handles on the waveform, or type exact mm:ss.ms times, to pick the range you want to keep.',
      },
      {
        h3: 'Download the trimmed MP3',
        p: 'The tool re-encodes the selected range to MP3 and hands you the new file. Your original is left untouched.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my audio uploaded anywhere?',
      a: 'No. Decoding, drawing the waveform and re-encoding all run in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'How precise is the trim?',
      a: 'Dragging the waveform handles is good for rough cuts. For exact points, type the start and end times directly as mm:ss.ms — the tool slices to the closest sample, though the very start of an MP3 frame can shift the audible cut by a few milliseconds.',
    },
    {
      q: 'What format do I get back?',
      a: 'An MP3. The selected range is re-encoded to MP3 with lamejs, a pure-JavaScript encoder, so the result plays everywhere. The tool produces a new trimmed file and never changes your original.',
    },
    {
      q: 'Can I keep stereo channels separate?',
      a: 'No — the tool mixes the file down to mono before re-encoding, the same as runlocally\'s other audio tools. If you need to preserve separate left/right channels, this isn\'t the right tool.',
    },
    {
      q: 'What happens if I select a zero-length range?',
      a: 'The trim button stays disabled until the start is before the end by a meaningful margin. If a range still comes out empty, the tool reports that rather than producing a broken file.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it keeps working without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a file size or length limit?',
      a: 'There is no fixed limit. Because everything runs in your browser, the practical ceiling depends on your device\'s memory. Very long recordings may be slower to decode or need more memory to process.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
