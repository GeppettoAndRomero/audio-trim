import type { ToolContent } from './types';

// Deutsch.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Audioclip zuschneiden — direkt im Browser, kein Upload | runlocally',
    description:
      'Schneide eine Audiodatei direkt im Browser auf einen Start- und Endpunkt zu. Ziehe eine MP3-, WAV- oder M4A-Datei hinein, lege den Bereich auf der Wellenform per Ziehen fest (oder gib genaue Zeiten ein) und erhalte eine zugeschnittene MP3-Datei. Nichts wird hochgeladen. Open Source, funktioniert offline.',
    ogTitle: 'Audioclip zuschneiden — direkt im Browser, kein Upload',
    ogDescription:
      'Schneide eine Audiodatei auf einen Start- und Endpunkt zu und erhalte eine zugeschnittene MP3-Datei — alles im Browser. Nichts wird hochgeladen. Open Source, funktioniert offline.',
  },

  hero: {
    h1: 'Audioclip zuschneiden',
    tagline:
      'Schneide eine Audiodatei auf einen Start- und Endpunkt zu und erhalte eine zugeschnittene MP3-Datei — im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Audio im Browser zuschneiden',
    paras: [
      'Dieses Tool schneidet eine Audiodatei auf einen von dir gewählten Bereich zu und liefert dir eine MP3-Datei mit genau diesem Ausschnitt. Ziehe eine MP3-, WAV-, M4A- oder ähnliche Datei hinein — praktisch, um einen Ausschnitt aus einer längeren Aufnahme zu holen, ein Sample oder einen Klingelton zuzuschneiden, oder stille Stellen am Anfang oder Ende zu entfernen, ohne sonst etwas zu verändern.',
      'Eine Wellenform zeigt den Verlauf der Datei, damit du siehst, wo geschnitten werden soll. Ziehe die beiden Griffe, um Start und Ende festzulegen, oder gib genaue Zeiten im Format mm:ss.ms ein, wenn du mehr Präzision brauchst, als das Ziehen erlaubt. Die Dauer des ausgewählten Bereichs wird bei jeder Anpassung aktualisiert.',
      'Alles läuft auf deinem Gerät. Die Web Audio API des Browsers dekodiert die Datei, und lamejs — reines JavaScript — kodiert den ausgewählten Bereich neu zu MP3. Es kommt weder WebAssembly noch ein Server zum Einsatz.',
    ],
  },

  privacy: {
    h2: 'Warum deine Audiodatei auf deinem Gerät bleibt',
    lead: 'Der Datenschutz hier ist strukturell bedingt, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Der gesamte Ablauf — Dekodieren, Wellenform zeichnen, Zuschneiden und Neukodieren — läuft in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage, die deine Audiodaten enthält.',
      'Der Quellcode ist offen und kann von jedem eingesehen werden (MIT).',
      'Es funktioniert offline — das ist nur möglich, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst überprüfen möchtest, öffne während der Nutzung das Netzwerk-Panel deines Browsers — keine Anfrage transportiert deine Datei.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Audiodatei ablegen',
        p: 'Klicke, um eine Datei auszuwählen, oder ziehe eine Datei irgendwo auf die Seite. MP3, WAV, M4A und andere gängige Formate funktionieren.',
      },
      {
        h3: 'Start und Ende festlegen',
        p: 'Ziehe die beiden Griffe auf der Wellenform, oder gib genaue Zeiten im Format mm:ss.ms ein, um den gewünschten Bereich auszuwählen.',
      },
      {
        h3: 'Zugeschnittene MP3-Datei herunterladen',
        p: 'Das Tool kodiert den ausgewählten Bereich neu zu MP3 und gibt dir die neue Datei. Deine Originaldatei bleibt unverändert.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird meine Audiodatei irgendwohin hochgeladen?',
      a: 'Nein. Dekodieren, Wellenform zeichnen und Neukodieren laufen alle in deinem Browser. Es gibt keine Serverkomponente, sodass deine Datei keinen Weg von deinem Gerät hat. Der Quellcode ist offen, und du kannst das im Netzwerk-Panel deines Browsers überprüfen.',
    },
    {
      q: 'Wie präzise ist der Zuschnitt?',
      a: 'Das Ziehen der Wellenform-Griffe eignet sich gut für grobe Schnitte. Für exakte Punkte gib Start- und Endzeit direkt im Format mm:ss.ms ein — das Tool schneidet auf die nächstliegende Sample-Position, wobei der Anfang eines MP3-Frames den hörbaren Schnittpunkt um wenige Millisekunden verschieben kann.',
    },
    {
      q: 'In welchem Format erhalte ich die Datei?',
      a: 'Als MP3. Der ausgewählte Bereich wird mit lamejs, einem reinen JavaScript-Encoder, zu MP3 neu kodiert, sodass das Ergebnis überall abspielbar ist. Das Tool erzeugt eine neue, zugeschnittene Datei und ändert nie dein Original.',
    },
    {
      q: 'Kann ich die Stereokanäle getrennt behalten?',
      a: 'Nein — das Tool mischt die Datei vor dem Neukodieren auf Mono herunter, genau wie die anderen Audio-Tools von runlocally. Wenn du getrennte linke/rechte Kanäle behalten musst, ist dieses Tool nicht die richtige Wahl.',
    },
    {
      q: 'Was passiert, wenn ich einen Bereich der Länge null auswähle?',
      a: 'Die Schaltfläche zum Zuschneiden bleibt deaktiviert, bis der Start deutlich vor dem Ende liegt. Sollte ein Bereich trotzdem leer ausfallen, meldet das Tool das, statt eine defekte Datei zu erzeugen.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es handelt sich um eine PWA. Nach dem ersten Besuch wird sie zwischengespeichert und funktioniert danach auch ohne Netzwerkverbindung weiter. Du kannst sie auch auf deinem Startbildschirm installieren.',
    },
    {
      q: 'Gibt es ein Limit für Dateigröße oder Länge?',
      a: 'Es gibt kein festes Limit. Da alles im Browser läuft, hängt die praktische Obergrenze vom Arbeitsspeicher deines Geräts ab. Sehr lange Aufnahmen können beim Dekodieren langsamer sein oder mehr Speicher benötigen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Entwickelt und gepflegt von Geppetto. Ein Teil des Codes ist mit KI-Unterstützung geschrieben; Review und Entscheidungen liegen vollständig beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
