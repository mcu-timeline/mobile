import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
});

export const TabsBackground = () => <View style={styles.background} />;
