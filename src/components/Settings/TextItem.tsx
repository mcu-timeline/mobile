import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = { children: string; center?: boolean };

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textCentered: {
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
});

export const TextItem: FC<Props> = ({ children, center }) => (
  <Text style={center ? styles.textCentered : styles.text}>{children}</Text>
);
