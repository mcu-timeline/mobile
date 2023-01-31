import { Rect, Svg } from 'react-native-svg';

export const Stats = () => (
  <Svg height="32" width="32" viewBox="0 0 64 64">
    <Rect x="2" y="44" width="12" height="22" rx="3" stroke="#ffffff" strokeWidth="4" />
    <Rect x="26" y="2" width="12" height="64" rx="3" stroke="#ffffff" strokeWidth="4" />
    <Rect x="50" y="30" width="12" height="36" rx="3" stroke="#ffffff" strokeWidth="4" />
  </Svg>
);
