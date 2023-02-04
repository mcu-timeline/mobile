import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  children: string;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  text: {
    color: '#767676',
  },
});

export const Label: FC<Props> = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{children}</Text>
  </View>
);
