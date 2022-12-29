import { FC, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MoviesStack } from '../../containers/MoviesStack';
import { useAuth, useProgress } from '../../hooks';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

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
    <SafeAreaView style={styles.container}>
      <MoviesStack />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};
