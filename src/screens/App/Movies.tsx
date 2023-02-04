import { FC } from 'react';

import { MoviesStack } from '../../containers/MoviesStack';
import { Layout } from '../../components/Layout';

export const MoviesScreen: FC = () => {
  return (
    <Layout>
      <MoviesStack />
    </Layout>
  );
};
