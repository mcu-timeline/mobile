import { FC } from 'react';
import { Loader } from '../../containers/Loader';

type Props = {
  visible: boolean;
};

export const LoadingScreen: FC<Props> = ({ visible }) => <Loader visible={visible} />;
