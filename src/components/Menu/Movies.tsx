import { Path, Rect, Svg } from 'react-native-svg';

export const Movies = () => (
  <Svg height="32" width="32" viewBox="0 0 64 64">
    <Rect x="2" y="6" width="60" height="52" rx="16" stroke="#ffffff" strokeWidth="4" />
    <Path d="M 22 19.3 L 22 44.7 L 42 32 L 22 19.3" strokeLinejoin="round" stroke="#ffffff" strokeWidth="4" />
  </Svg>
);
