import { FC, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '../../../screens/types';
import { Item } from './Item';

type Props = { children: string; navigateTo: keyof UserStackParamList } & Pick<
  NativeStackScreenProps<UserStackParamList, 'Main'>,
  'navigation'
>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

export const NavigationItem: FC<Props> = ({ children, navigation, navigateTo }) => {
  const onPress = useCallback(() => {
    navigation.navigate(navigateTo);
  }, [navigation, navigateTo]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Item>{children}</Item>
    </Pressable>
  );
};
