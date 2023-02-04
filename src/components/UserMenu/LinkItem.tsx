import { FC, useCallback } from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';

import { Item } from './Item';

type Props = { children: string; link: string };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

export const LinkItem: FC<Props> = ({ children, link }) => {
  const onPress = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(link);
      if (canOpen) {
        Linking.openURL(link);
      }
    } catch (error) {
      console.log(error);
    }
  }, [link]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Item>{children}</Item>
    </Pressable>
  );
};
