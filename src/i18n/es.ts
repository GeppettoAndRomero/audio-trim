import type { ToolContent } from './types';

// Español.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Recortar un clip de audio — en tu navegador, sin subir nada | runlocally',
    description:
      'Recorta un archivo de audio a un punto de inicio y fin directamente en tu navegador. Suelta un MP3, WAV o M4A, arrastra el rango sobre la forma de onda (o escribe tiempos exactos) y obtén un MP3 recortado. No se sube nada. Código abierto, funciona sin conexión.',
    ogTitle: 'Recortar un clip de audio — en tu navegador, sin subir nada',
    ogDescription:
      'Recorta un archivo de audio a un punto de inicio y fin y obtén un MP3 recortado, todo en tu navegador. No se sube nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Recortar un clip de audio',
    tagline:
      'Recorta un archivo de audio a un punto de inicio y fin y obtén un MP3 recortado — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Recorta audio en tu navegador',
    paras: [
      'Esta herramienta recorta un archivo de audio al rango que elijas y te entrega un MP3 con exactamente ese fragmento. Suelta un archivo MP3, WAV, M4A o similar: es útil para extraer un fragmento de una grabación más larga, recortar una muestra o un tono de llamada, o quitar silencio del principio o el final sin tocar nada más.',
      'Una forma de onda muestra la forma del archivo para que veas dónde cortar. Arrastra los dos controles para fijar el inicio y el fin, o escribe tiempos exactos en formato mm:ss.ms si necesitas más precisión de la que permite arrastrar. La duración del rango seleccionado se actualiza mientras lo ajustas.',
      'Todo se ejecuta en tu dispositivo. La API Web Audio del navegador decodifica el archivo, y lamejs —JavaScript puro— vuelve a codificar el rango seleccionado a MP3. No interviene WebAssembly ni ningún servidor.',
    ],
  },

  privacy: {
    h2: 'Por qué tu audio se queda en tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'Todo el proceso —decodificar, dibujar la forma de onda, recortar y volver a codificar— se ejecuta en tu navegador.',
      'La página se sirve como archivos estáticos y no genera ninguna solicitud que transporte tu audio.',
      'El código fuente es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de red de tu navegador mientras se ejecuta: ninguna solicitud transporta tu archivo.',
    sourceLinkText: 'Ver el código fuente.',
  },

  howto: {
    h2: 'Cómo usarla',
    steps: [
      {
        h3: 'Suelta un archivo de audio',
        p: 'Haz clic para elegir un archivo, o suéltalo en cualquier parte de la página. Funcionan MP3, WAV, M4A y otros formatos comunes.',
      },
      {
        h3: 'Fija el inicio y el fin',
        p: 'Arrastra los dos controles sobre la forma de onda, o escribe tiempos exactos en formato mm:ss.ms, para elegir el rango que quieres conservar.',
      },
      {
        h3: 'Descarga el MP3 recortado',
        p: 'La herramienta vuelve a codificar el rango seleccionado a MP3 y te entrega el archivo nuevo. Tu original queda intacto.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi audio a algún sitio?',
      a: 'No. Decodificar, dibujar la forma de onda y volver a codificar se ejecutan en tu navegador. No hay ningún componente de servidor, así que tu archivo no tiene forma de salir de tu dispositivo. El código fuente es abierto y puedes comprobarlo en el panel de red de tu navegador.',
    },
    {
      q: '¿Qué tan preciso es el recorte?',
      a: 'Arrastrar los controles de la forma de onda funciona bien para recortes aproximados. Para puntos exactos, escribe directamente los tiempos de inicio y fin en formato mm:ss.ms: la herramienta recorta a la muestra más cercana, aunque el inicio de un fotograma MP3 puede desplazar el corte audible unos milisegundos.',
    },
    {
      q: '¿En qué formato obtengo el resultado?',
      a: 'En MP3. El rango seleccionado se vuelve a codificar a MP3 con lamejs, un codificador en JavaScript puro, así que el resultado se reproduce en cualquier sitio. La herramienta genera un archivo recortado nuevo y nunca modifica tu original.',
    },
    {
      q: '¿Puedo conservar los canales estéreo por separado?',
      a: 'No: la herramienta mezcla el archivo a mono antes de volver a codificarlo, igual que el resto de herramientas de audio de runlocally. Si necesitas conservar los canales izquierdo y derecho por separado, esta no es la herramienta adecuada.',
    },
    {
      q: '¿Qué pasa si selecciono un rango de duración cero?',
      a: 'El botón de recortar permanece desactivado hasta que el inicio quede claramente antes del fin. Si aun así el rango resulta vacío, la herramienta lo informa en lugar de generar un archivo dañado.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Después de la primera visita queda en caché, así que sigue funcionando sin conexión a internet. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de tamaño o duración de archivo?',
      a: 'No hay un límite fijo. Como todo se ejecuta en tu navegador, el límite práctico depende de la memoria de tu dispositivo. Las grabaciones muy largas pueden decodificarse más despacio o necesitar más memoria.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— herramientas pequeñas que funcionan de forma local en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código está escrito con ayuda de IA; toda revisión y decisión es responsabilidad del mantenedor.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
