import { FC } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

import { IconProps } from './types';

export const Movies: FC<IconProps> = ({ color, size }) => (
  <Svg height={size} width={size} viewBox="0 0 64 64">
    <Rect x="2" y="6" width="60" height="52" rx="16" stroke={color} strokeWidth="4" />
    <Path d="M 22 19.3 L 22 44.7 L 42 32 L 22 19.3" strokeLinejoin="round" stroke={color} strokeWidth="4" />
  </Svg>
);
