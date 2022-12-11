import { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../hooks';
import { FCC } from '../../types';

type Props = {
  withMenu?: boolean;
};

export const Layout: FCC<Props> = ({ children, withMenu = false }) => {
  const colorPallette = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colorPallette.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        main: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [colorPallette],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>{children}</View>
      {withMenu ? (
        <View>
          <Text>BOTTOM MENU</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
