import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style: StyleProp<ViewStyle>;
};

export const Logo: FC<Props> = ({ style }) => (
  <Svg style={style} width={263} height={59} viewBox="0 0 526 118">
    <Path
      d="M 0 0 L 0 118 L 13 113 L 13 35 L 39 87 L 65 35 L 65 104 L 78 102 L 78 9 L 64 7 L 39 54 L 14 2 L 0 0 Z"
      fill="#000000"
    />
    <Path
      d="M 152 26 C 120 -6 83 17 83 55 C 83 93 120 112 153 82 L 143 73 C 119 94 96 78 96 55 C 96 32 119 16 143 35 L 152 26 Z"
      fill="#000000"
    />
    <Path
      d="M 173 16 L 198 89 L 212 88 L 228 40 L 245 88 L 259 87 L 282 18 L 268 19 L 252 68 L 235 19 L 220 19 L 204 68 L 187 17 L 173 16 Z"
      fill="#000000"
    />
    <Path
      d="M 265 88 L 301 18 L 318 18 L 351 91 L 336 90 L 308 34 L 292 64 L 313 65 L 319 77 L 286 76 L 280 88 L 265 88 Z"
      fill="#000000"
    />
    <Path d="M 336 30 L 359 29 L 359 92 L 372 93 L 372 29 L 395 27 L 395 13 L 336 17 L 336 30 Z" fill="#000000" />
    <Path
      d="M 462 20 C 440 -10 393 17 393 55 C 393 93 440 120 462 93 L 453 80 C 436 97 407 82 407 55 C 407 28 436 13 453 32 L 462 20 Z"
      fill="#000000"
    />
    <Path
      d="M 466 7 L 466 107 L 479 109 L 479 66 L 512 69 L 512 115 L 526 118 L 526 0 L 512 2 L 512 49 L 479 48 L 479 5 L 466 7 Z"
      fill="#000000"
    />
  </Svg>
);
