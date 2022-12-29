import { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Layout } from '../../components/Layout';
import { TimelineForm } from '../../components/TimelineForm';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TimelinePicker'>;

export const TimelinePickerScreen: FC<Props> = (props) => (
  <Layout>
    <TimelineForm {...props} />
  </Layout>
);
