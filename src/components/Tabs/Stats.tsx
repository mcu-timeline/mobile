import { FC } from 'react';
import { Rect, Svg } from 'react-native-svg';

import { IconProps } from './types';

export const Stats: FC<IconProps> = ({ color, size }) => (
  <Svg height={size} width={size} viewBox="0 0 64 64">
    <Rect x="2" y="44" width="12" height="18" rx="3" stroke={color} strokeWidth="4" />
    <Rect x="26" y="2" width="12" height="60" rx="3" stroke={color} strokeWidth="4" />
    <Rect x="50" y="30" width="12" height="32" rx="3" stroke={color} strokeWidth="4" />
  </Svg>
);
