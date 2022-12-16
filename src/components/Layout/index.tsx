import { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../../hooks';
import { FCC } from '../../types';

type Props = {
  withMenu?: boolean;
};

export const Layout: FCC<Props> = ({ children, withMenu = false }) => {
  const colorPalette = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        main: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        },
      }),
    [colorPalette],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.main}>{children}</View>
      {withMenu ? (
        <View>
          <Text>BOTTOM MENU</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
