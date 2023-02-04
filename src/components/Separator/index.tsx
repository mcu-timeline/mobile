import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  children: string;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#ffffff' },
  text: { textAlign: 'center', color: '#ffffff', marginHorizontal: 20 },
});

export const Separator: FC<Props> = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
    <View style={styles.line} />
  </View>
);
