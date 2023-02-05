import { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export const Selected: FC<Props> = ({ style }) => (
  <Svg style={[styles.container, style]} height={32} width={32} viewBox="0 0 64 64">
    <Path d="M 16 31 L 28 43 L 48 21" strokeLinejoin="round" stroke="#E62429" strokeWidth="4" />
  </Svg>
);
