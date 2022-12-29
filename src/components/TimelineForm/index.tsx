import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../Button';
import { RootStackParamList } from '../../screens/types';
import { useProgress } from '../../hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

type Props = NativeStackScreenProps<RootStackParamList, 'TimelinePicker'>;

export const TimelineForm: FC<Props> = ({ navigation }) => {
  const { setActiveTimeline } = useProgress();

  const pickMainTimeline = useCallback(() => {
    setActiveTimeline('Full', () => {
      navigation.replace('Home');
    });
  }, [setActiveTimeline, navigator]);

  return (
    <View style={styles.container}>
      <Button onPress={pickMainTimeline} variant="primary">
        Full Timeline
      </Button>
    </View>
  );
};
