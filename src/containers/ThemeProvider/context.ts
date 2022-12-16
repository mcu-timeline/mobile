import { createContext } from 'react';
import { Appearance } from 'react-native';

import { colorPalette, ColorPalette } from '../../helpers';

const colorScheme = Appearance.getColorScheme() || 'light';

const initialContext: ColorPalette = colorPalette[colorScheme];

export const ThemeContext = createContext<ColorPalette>(initialContext);
