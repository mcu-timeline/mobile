import { FC, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Layout } from '../../../components/Layout';
import { TimelineForm } from '../../../components/TimelineForm';
import { UserStackParamList } from '../../types';

type Props = NativeStackScreenProps<UserStackParamList, 'TimelinePicker'>;

export const TimelinePickerScreen: FC<Props> = ({ navigation }) => {
  const onSuccess = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Layout>
      <TimelineForm onSuccess={onSuccess} />
    </Layout>
  );
};
