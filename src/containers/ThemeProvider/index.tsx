import { useColorScheme } from 'react-native';

import { FCC } from '../../types';
import { colorPalette } from '../../helpers';

import { ThemeContext } from './context';

export const ThemeProvider: FCC = ({ children }) => {
  const colorScheme = useColorScheme() || 'light';
  const context = colorPalette[colorScheme];

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};
