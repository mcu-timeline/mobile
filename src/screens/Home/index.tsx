import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const HomeScreen = () => (
  <View style={styles.container}>
    <Text>HOME SCREEN</Text>
  </View>
);
