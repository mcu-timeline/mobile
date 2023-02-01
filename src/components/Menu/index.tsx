import { FC, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../screens/types';

import { Movies } from './Movies';
import { User } from './User';

type Props = Pick<NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>, 'navigation' | 'route'>;

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    height: 50,
  },
});

export const Menu: FC<Props> = ({ navigation, route }) => {
  const navigateToMovies = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const navigateToUser = useCallback(() => {
    navigation.navigate('User');
  }, [navigation]);

  return (
    <View style={styles.menu}>
      <Pressable onPress={navigateToMovies}>
        <Movies active={route.name === 'Home'} />
      </Pressable>
      <Pressable onPress={navigateToUser}>
        <User active={route.name === 'User'} />
      </Pressable>
    </View>
  );
};
