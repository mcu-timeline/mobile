import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const LoadingScreen = () => (
  <View style={styles.container}>
    <Text>Loading</Text>
  </View>
);
