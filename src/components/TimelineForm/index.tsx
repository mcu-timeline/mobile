import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../Button';
import { useProgress } from '../../hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

type Props = {
  onSuccess?: () => void;
};
export const TimelineForm: FC<Props> = ({ onSuccess }) => {
  const { setActiveTimeline } = useProgress();

  const pickMainTimeline = useCallback(() => {
    setActiveTimeline('Full', onSuccess);
  }, [setActiveTimeline, navigator]);

  return (
    <View style={styles.container}>
      <Button onPress={pickMainTimeline} variant="primary">
        Full Timeline
      </Button>
    </View>
  );
};
