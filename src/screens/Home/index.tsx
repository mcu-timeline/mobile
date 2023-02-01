import { FC, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MoviesStack } from '../../containers/MoviesStack';
import { useProgress } from '../../hooks';
import { RootStackParamList } from '../types';
import { Layout } from '../../components/Layout';
import { Menu } from '../../components/Menu';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: FC<Props> = ({ navigation, route }) => {
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
    <Layout menu={<Menu navigation={navigation} route={route} />}>
      <MoviesStack />
    </Layout>
  );
};
