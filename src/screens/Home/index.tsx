import { StyleSheet, Text, View, Button } from 'react-native';

import { useAuth } from '../../hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
