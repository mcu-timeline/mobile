const addTransparency = (color: string, opacity: number): string => {
  const opacityHex = Math.round(opacity * 2.55)
    .toString(16)
    .padStart(2, '0');
  return `${color}${opacityHex}`;
};

const colors = {
  dark: {
    primary: '#003F5C',
    secondary: '#00608C',
    accent: '#CD3F5C',
    tertiary: '#00605C',
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

export type ColorPallette = Record<'background' | 'text' | 'inputBackground', string>;

export const colorPallette: Record<'light' | 'dark', ColorPallette> = {
  dark: {
    background: colors.dark.primary,
    text: colors.white,
    inputBackground: colors.dark.secondary,
  },
  light: {
    background: colors.white,
    text: colors.black,
    inputBackground: addTransparency(colors.light.secondary, 30),
  },
};
