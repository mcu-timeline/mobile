import { FC, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { CDN_URL } from '../../helpers';
import { Timeline } from '../../types';
import { Selected } from './Selected';

type Props = {
  timeline: Timeline;
  pickTimeline: (timelineId: string) => void;
  active?: boolean;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 0,
    backgroundColor: '#000000',
    overflow: 'hidden',
    width: '50%',
  },
  icon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    color: '#767676',
  },
});

export const Card: FC<Props> = ({ timeline, pickTimeline, active }) => {
  const onPress = useCallback(() => {
    pickTimeline(timeline.id);
  }, [pickTimeline, timeline]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{ uri: `${CDN_URL}/${timeline.image}` }} />
      {active ? <Selected style={styles.icon} /> : null}
      <Text style={styles.text}>{timeline.name}</Text>
      <Text style={styles.description}>{timeline.description}</Text>
    </Pressable>
  );
};
