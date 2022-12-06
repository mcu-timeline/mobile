import { FC } from 'react';
import { Text, View } from 'react-native';

import { SCREEN_WIDTH } from '../../helpers';

type Props = {
  item: { name: string; id: string };
  width?: number;
};

const styles = {
  padding: 10,
  width: SCREEN_WIDTH,
} as const;

const cardStyles = {
  backgroundColor: `#900`,
  flex: 1,
  padding: 10,
  borderRadius: 20,
} as const;

export const Card: FC<Props> = ({ item, width = SCREEN_WIDTH }) => (
  <View style={styles}>
    <View style={cardStyles}>
      <Text>{item.name}</Text>
    </View>
  </View>
);
