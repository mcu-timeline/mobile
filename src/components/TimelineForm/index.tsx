import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../Button';
import { RootStackParamList } from '../../screens/types';
import { UserProgress } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const UPSERT_ACTIVE_TIMELINE = gql`
  mutation ($data: UpsertActiveTimelineInput) {
    upsertActiveTimeline(upsertActiveTimelineInput: $data) {
      id
      userId
      activeTimeline
      currentMovieId
    }
  }
`;

type Params = {
  data: {
    activeTimelineId: string;
  };
};

type Response = {
  upsertActiveTimeline: UserProgress;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TimelinePicker'>;

export const TimelineForm: FC<Props> = ({ navigation }) => {
  const [mutate] = useMutation<Response, Params>(UPSERT_ACTIVE_TIMELINE, {
    onCompleted: () => {
      navigation.replace('Home');
    },
  });

  const pickMainTimeline = useCallback(() => {
    mutate({ variables: { data: { activeTimelineId: 'Full' } } });
  }, [mutate]);

  return (
    <View style={styles.container}>
      <Button onPress={pickMainTimeline} variant="primary">
        Full Timeline
      </Button>
    </View>
  );
};
