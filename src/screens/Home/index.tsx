import { FC, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MoviesStack } from '../../containers/MoviesStack';
import { useAuth, useProgress } from '../../hooks';
import { RootStackParamList } from '../types';
import { Layout } from '../../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const { activeTimeline, isLoading } = useProgress();

  useEffect(() => {
    if (!isLoading && !activeTimeline) {
      navigation.replace('TimelinePicker');
    }
  }, [activeTimeline, isLoading, navigation]);

  if (isLoading) {
    return null;
  }

  return (
    <Layout menu={<Button title="Logout" onPress={logout} />}>
      <MoviesStack />
    </Layout>
  );
};
