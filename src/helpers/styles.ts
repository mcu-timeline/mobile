const addTransparency = (color: string, opacity: number): string => {
  const opacityHex = Math.round(opacity * 2.55)
    .toString(16)
    .padStart(2, '0');
  return `${color}${opacityHex}`;
};

const colors = {
  dark: {
    primary: '#5E81C5',
    secondary: '#5A5673',
    accent: '#F2F1DF',
    tertiary: '#7F99CA',
  },
  light: {
    primary: '#0070A3',
    secondary: '#0086C4',
    accent: '#DE4563',
    tertiary: '#00C2B8',
  },
  black: '#000000',
  white: '#FFFFFF',
};

export type Keys = 'background' | 'text' | 'inputBackground' | 'buttonPrimary';

export type ColorPalette = Record<Keys, string>;

export const colorPalette: Record<'light' | 'dark', ColorPalette> = {
  dark: {
    background: colors.dark.primary,
    text: colors.white,
    inputBackground: colors.dark.secondary,
    buttonPrimary: colors.dark.primary,
  },
  light: {
    background: colors.white,
    text: colors.black,
    inputBackground: addTransparency(colors.light.secondary, 30),
    buttonPrimary: colors.light.primary,
  },
};
