import { createContext } from 'react';
import { Appearance } from 'react-native';

import { colorPallette, ColorPallette } from '../../helpers';

const colorScheme = Appearance.getColorScheme() || 'light';

const initialContext: ColorPallette = colorPallette[colorScheme];

export const ThemeContext = createContext<ColorPallette>(initialContext);
