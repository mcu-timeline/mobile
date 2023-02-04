import { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Layout } from '../../../components/Layout';
import { UserMenu } from '../../../components/UserMenu';
import { UserStackParamList } from '../../types';

type Props = NativeStackScreenProps<UserStackParamList, 'Main'>;

export const MainScreen: FC<Props> = ({ navigation }) => (
  <Layout>
    <UserMenu navigation={navigation} />
  </Layout>
);
