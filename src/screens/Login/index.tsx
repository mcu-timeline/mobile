import { StyleSheet, SafeAreaView, Button } from 'react-native';

import { useAuth } from '../../hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const LoginScreen = () => {
  const { login } = useAuth();

  const logInHandler = () => {
    login('local');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Login" onPress={logInHandler} />
    </SafeAreaView>
  );
};
