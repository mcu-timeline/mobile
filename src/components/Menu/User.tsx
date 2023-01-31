import { FC } from 'react';
import { Circle, Svg } from 'react-native-svg';

import { IconProps } from './types';

export const User: FC<IconProps> = ({ active }) => {
  const color = active ? '#ffffff' : '#999999';

  return (
    <Svg height="32" width="32" viewBox="0 0 64 64">
      <Circle cx="32" cy="64" r="28" stroke={color} strokeWidth="4" />
      <Circle cx="32" cy="16" r="12" stroke={color} strokeWidth="4" />
    </Svg>
  );
};
