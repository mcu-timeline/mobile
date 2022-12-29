import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../Button';
import { useAuth } from '../../hooks';
import { USER } from '../../helpers';
import { Separator } from '../Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  main: {
    height: '35%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export const LoginForm: FC = () => {
  const { login } = useAuth();

  const loginLocal = useCallback(() => {
    login(USER.TYPE.LOCAL);
  }, [login]);

  const loginRemote = useCallback(() => {
    login(USER.TYPE.REMOTE);
  }, [login]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Button onPress={loginRemote} variant="primary">
          Log in
        </Button>
        <Separator>or</Separator>
        <Button onPress={loginLocal} variant="secondary">
          Continue without account
        </Button>
      </View>
    </View>
  );
};
