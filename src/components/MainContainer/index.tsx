import { StyleSheet, View } from 'react-native';

import { FCC } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const MainContainer: FCC = ({ children }) => <View style={styles.container}>{children}</View>;
