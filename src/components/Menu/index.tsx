import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../screens/types';

import { Movies } from './Movies';
import { Stats } from './Stats';
import { User } from './User';

type Props = NativeStackScreenProps<RootStackParamList>;

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

export const Menu: FC<Props> = () => (
  <View style={styles.menu}>
    <Stats />
    <Movies />
    <User />
  </View>
);
