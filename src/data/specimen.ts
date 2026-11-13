export type SpecimenTheme = 'light' | 'dark';
export type SpecimenAccent = 'crimson' | 'ink' | 'blue' | 'green' | 'custom';
export type SpecimenSettings = {
  accent: SpecimenAccent;
  customColor?: string;
  density: 'relaxed' | 'compact';
  radius: number;
  font: 'sans' | 'serif';
  typeSize: number;
  outlined: boolean;
};

export const initialSpecimenSettings: SpecimenSettings = {
  accent: 'crimson', customColor: '#8763D0', density: 'relaxed', radius: 8, font: 'sans', typeSize: 28, outlined: false,
};

const palettes = {
  light: { canvas: '#F3F2EE', surface: '#FFFFFF', text: '#202328', muted: '#60646B', line: '#CFD1D3',
    accents: { crimson: '#B1243A', ink: '#24292E', blue: '#254C87', green: '#176044' }, onAccent: '#FFFFFF' },
  dark: { canvas: '#191B1F', surface: '#24272D', text: '#F3F2EE', muted: '#B7BAC2', line: '#505660',
    accents: { crimson: '#EF91A1', ink: '#E6E8EA', blue: '#9EBDEB', green: '#9DD5B6' }, onAccent: '#191B1F' },
};

const bounded = (value: number, min: number, max: number) => Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));

export function getSpecimenTokens(settings: SpecimenSettings, theme: SpecimenTheme) {
  const palette = palettes[theme];
  return {
    canvas: palette.canvas,
    surface: palette.surface,
    text: palette.text,
    muted: palette.muted,
    line: palette.line,
    accent: getSpecimenAccentColor(settings.accent, theme, settings.customColor),
    accentInk: readableAccent(getSpecimenAccentColor(settings.accent, theme, settings.customColor), palette.surface, palette.text),
    onAccent: settings.accent === 'custom' ? onColor(getSpecimenAccentColor(settings.accent, theme, settings.customColor)) : palette.onAccent,
    radius: `${bounded(settings.radius, 0, 16)}px`,
    space: settings.density === 'compact' ? '12px' : '20px',
    fontFamily: settings.font === 'serif' ? "'Newsreader', Georgia, serif" : "'Instrument Sans', Arial, sans-serif",
    typeSize: `${bounded(settings.typeSize, 18, 36)}px`,
  };
}

export function serializeSpecimenTokens(settings: SpecimenSettings, theme: SpecimenTheme) {
  const tokens = getSpecimenTokens(settings, theme);
  return JSON.stringify({ theme, density: settings.density, action: settings.outlined ? 'outline' : 'solid', ...tokens }, null, 2);
}

export function getSpecimenAccentColor(accent: SpecimenAccent, theme: SpecimenTheme, custom = '#8763D0') {
  return accent === 'custom' ? (/^#[0-9a-f]{6}$/i.test(custom) ? custom.toUpperCase() : '#8763D0') : palettes[theme].accents[accent];
}
function luminance(hex: string) {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
function onColor(hex: string) { return luminance(hex) > .179 ? '#000000' : '#FFFFFF'; }
function readableAccent(hex: string, surface: string, fallback: string) {
  const a = luminance(hex), b = luminance(surface);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 4.5 ? hex : fallback;
}
export function singleLine(value: string, limit = 120) { return value.replace(/[\r\n\t\u2028\u2029]+/g, ' ').slice(0, limit); }