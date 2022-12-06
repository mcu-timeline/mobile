import { StyleSheet, SafeAreaView, Button } from 'react-native';

import { MoviesStack } from '../../containers/MoviesStack';
import { useAuth } from '../../hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <MoviesStack />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};
