import { StyleSheet, View, Button } from 'react-native';

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
  const { logIn } = useAuth();

  const logInHandler = () => {
    logIn('local');
  };

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={logInHandler} />
    </View>
  );
};
