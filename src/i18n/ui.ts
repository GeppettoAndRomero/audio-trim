/**
 * Preact アイランド（クライアント UI）の文言。ロケール別。
 * ページレベル content (`en.ts` / `ja.ts`) とは別に、インタラクティブな
 * アイランドが表示する文字列をここに集約する。
 *
 * 重要: アイランドは locale を PROP で受け取り（SSR 時に存在）、
 * `document` 等から読まない。SSR とクライアントで同一文字列を描画して
 * hydration mismatch を防ぐ。
 *
 * 補間文字列は `{name}` / `{count}` のテンプレートを持ち、
 * アイランド側で `.replace('{name}', x)` する。
 */
export const ui = {
  en: {
    // ConversionManager
    uploadHeading: 'Upload a file',
    uploadSubtitle: 'Choose an audio file.',
    dropClick: 'Click to choose a file',
    dropOr: 'or drop a file anywhere on the page',
    dropSupported: 'Audio: mp3, wav, m4a, and more',
    decoding: 'Loading audio…',
    startLabel: 'Start',
    endLabel: 'End',
    selectedDuration: 'Selected duration',
    trimButton: 'Trim',
    processing: 'Processing…',
    notificationsAria: 'Notifications',
    errUnsupported: 'Not an audio file ({name}).',
    errAudioDecode: "Could not decode this audio file. It may be corrupt or in a format your browser doesn't support.",
    errZeroLengthSelection: 'Select a range with a positive length before trimming.',
    errConversionFailed: 'Trimming failed',

    // WaveformSelector
    rangeSelectorAria: 'Audio range selector',
    startHandleAria: 'Selection start',
    endHandleAria: 'Selection end',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // GlobalDropZone
    dzProcessing: 'Processing {count} file(s)...',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a file to trim',
    dzDropSub: 'Drop audio to select a range to keep',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
  },
  ja: {
    // ConversionManager
    uploadHeading: 'ファイルを選ぶ',
    uploadSubtitle: '音声ファイルを選んでください。',
    dropClick: 'クリックして選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: '音声: mp3, wav, m4a など',
    decoding: '音声を読み込み中…',
    startLabel: '開始',
    endLabel: '終了',
    selectedDuration: '選択範囲の長さ',
    trimButton: 'トリミング',
    processing: '処理中…',
    notificationsAria: '通知',
    errUnsupported: '音声ファイルではありません（{name}）。',
    errAudioDecode: 'この音声ファイルをデコードできませんでした。壊れているか、対応していない形式の可能性があります。',
    errZeroLengthSelection: 'トリミングする前に、長さが 0 より大きい範囲を選択してください。',
    errConversionFailed: 'トリミングに失敗しました',

    // WaveformSelector
    rangeSelectorAria: '音声の範囲選択',
    startHandleAria: '選択開始位置',
    endHandleAria: '選択終了位置',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを処理中…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップしてトリミング',
    dzDropSub: '音声をドロップして残す範囲を選択',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
  },
  zh: {
    // ConversionManager
    uploadHeading: '选择文件',
    uploadSubtitle: '选择一个音频文件。',
    dropClick: '点击选择文件',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: '音频：mp3、wav、m4a 等',
    decoding: '正在加载音频…',
    startLabel: '开始',
    endLabel: '结束',
    selectedDuration: '所选时长',
    trimButton: '裁剪',
    processing: '正在处理…',
    notificationsAria: '通知',
    errUnsupported: '不是音频文件（{name}）。',
    errAudioDecode: '无法解码此音频文件。文件可能已损坏，或格式不受支持。',
    errZeroLengthSelection: '请先选择一个长度大于零的范围，再进行裁剪。',
    errConversionFailed: '裁剪失败',

    // WaveformSelector
    rangeSelectorAria: '音频范围选择器',
    startHandleAria: '选择起点',
    endHandleAria: '选择终点',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // GlobalDropZone
    dzProcessing: '正在处理 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放以裁剪',
    dzDropSub: '拖入音频以选择要保留的范围',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
  },
  de: {
    // ConversionManager
    uploadHeading: 'Datei auswählen',
    uploadSubtitle: 'Wähle eine Audiodatei.',
    dropClick: 'Zum Auswählen klicken',
    dropOr: 'oder eine Datei irgendwo auf die Seite ziehen',
    dropSupported: 'Audio: mp3, wav, m4a u. a.',
    decoding: 'Audio wird geladen…',
    startLabel: 'Start',
    endLabel: 'Ende',
    selectedDuration: 'Ausgewählte Dauer',
    trimButton: 'Zuschneiden',
    processing: 'Wird verarbeitet…',
    notificationsAria: 'Benachrichtigungen',
    errUnsupported: 'Keine Audiodatei ({name}).',
    errAudioDecode: 'Diese Audiodatei konnte nicht dekodiert werden. Sie ist möglicherweise beschädigt oder in einem nicht unterstützten Format.',
    errZeroLengthSelection: 'Wähle einen Bereich mit einer Länge größer als null, bevor du zuschneidest.',
    errConversionFailed: 'Zuschneiden fehlgeschlagen',

    // WaveformSelector
    rangeSelectorAria: 'Audio-Bereichsauswahl',
    startHandleAria: 'Auswahlanfang',
    endHandleAria: 'Auswahlende',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden verarbeitet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: 'Zum Zuschneiden ablegen',
    dzDropSub: 'Lege Audio ab, um den zu behaltenden Bereich auszuwählen',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
  },
  es: {
    // ConversionManager
    uploadHeading: 'Seleccionar archivo',
    uploadSubtitle: 'Elige un archivo de audio.',
    dropClick: 'Haz clic para elegir un archivo',
    dropOr: 'o suelta un archivo en cualquier parte de la página',
    dropSupported: 'Audio: mp3, wav, m4a y más',
    decoding: 'Cargando audio…',
    startLabel: 'Inicio',
    endLabel: 'Fin',
    selectedDuration: 'Duración seleccionada',
    trimButton: 'Recortar',
    processing: 'Procesando…',
    notificationsAria: 'Notificaciones',
    errUnsupported: 'No es un archivo de audio ({name}).',
    errAudioDecode: 'No se pudo decodificar este archivo de audio. Puede estar dañado o tener un formato no compatible.',
    errZeroLengthSelection: 'Selecciona un rango con una duración mayor que cero antes de recortar.',
    errConversionFailed: 'El recorte falló',

    // WaveformSelector
    rangeSelectorAria: 'Selector de rango de audio',
    startHandleAria: 'Inicio de la selección',
    endHandleAria: 'Fin de la selección',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // GlobalDropZone
    dzProcessing: 'Procesando {count} archivo(s)...',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta el archivo para recortar',
    dzDropSub: 'Suelta audio para elegir el rango que quieres conservar',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
