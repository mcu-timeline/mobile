import { useContext } from 'react';

import { ThemeContext } from '../containers/ThemeProvider/context';

export const useTheme = () => useContext(ThemeContext);
