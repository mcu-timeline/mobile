import { FC } from 'react';
import { Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../../hooks';
import { RootStackParamList } from '../types';
import { Layout } from '../../components/Layout';
import { Menu } from '../../components/Menu';

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

export const UserScreen: FC<Props> = ({ navigation, route }) => {
  const { logout } = useAuth();

  return (
    <Layout menu={<Menu navigation={navigation} route={route} />}>
      <Text>USER SCREEN</Text>
      <Button title="Logout" onPress={logout} />
    </Layout>
  );
};
