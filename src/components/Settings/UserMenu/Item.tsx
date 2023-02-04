import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { NextArrow } from '../NextArrow';

type Props = { children: string };

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export const Item: FC<Props> = ({ children }) => (
  <>
    <Text style={styles.text}>{children}</Text>
    <NextArrow />
  </>
);
