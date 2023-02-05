import { View, Text, StyleSheet } from 'react-native';

import { FCC } from '../../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff20',
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: '#ffffff',
  },
});

type Props = { children: string; gap: number };

export const Tag: FCC<Props> = ({ children, gap }) => (
  <View style={{ ...styles.container, marginHorizontal: gap }}>
    <Text style={styles.text}>{children}</Text>
  </View>
);
