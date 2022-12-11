import { Appearance, useColorScheme } from 'react-native';

import { FCC } from '../../types';
import { colorPallette } from '../../helpers';

import { ThemeContext } from './context';

export const ThemeProvider: FCC = ({ children }) => {
  const colorScheme = useColorScheme() || 'light';
  const context = colorPallette[colorScheme];

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};
