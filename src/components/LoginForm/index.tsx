import { FC } from 'react';
import { Button, TextInput, View } from 'react-native';

import { useAuth } from '../../hooks';
import { USER } from '../../helpers';

export const LoginForm: FC = () => {
  const { login } = useAuth();

  const loginLocal = () => {
    login(USER.TYPE.LOCAL);
  };

  const loginRemote = () => {
    login(USER.TYPE.REMOTE);
  };

  return (
    <View>
      <Button title="Login" onPress={loginRemote} />
      <Button title="Continue without account" onPress={loginLocal} />
    </View>
  );
};
