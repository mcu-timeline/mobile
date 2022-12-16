import { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../hooks';

type Props = {
  children: string;
};

export const Separator: FC<Props> = ({ children }) => {
  const colorPalette = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flexDirection: 'row', alignItems: 'center', width: '90%', marginVertical: 20 },
        line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colorPalette.text },
        text: { textAlign: 'center', color: colorPalette.text, marginHorizontal: 20 },
      }),
    [colorPalette],
  );

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};
