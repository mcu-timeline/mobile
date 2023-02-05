import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useProgress } from '../../hooks';

import { useGetTimelines } from './query';
import { Card } from './Card';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

type Props = {
  onSuccess?: () => void;
};
export const TimelineForm: FC<Props> = ({ onSuccess }) => {
  const { setActiveTimeline, activeTimeline } = useProgress();
  const { data, loading } = useGetTimelines();

  const pickTimeline = useCallback(
    (timelineId: string) => {
      setActiveTimeline(timelineId, onSuccess);
    },
    [setActiveTimeline, onSuccess],
  );

  if (loading || !data) {
    return <Text>LOADING</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.items}>
        {data.timelines.map((timeline) => (
          <Card
            key={timeline.id}
            timeline={timeline}
            pickTimeline={pickTimeline}
            active={activeTimeline === timeline.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};
