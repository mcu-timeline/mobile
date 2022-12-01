import { useContext } from 'react';

import { ProgressContext } from '../containers/ProgressProvider/context';

export const useProgress = () => useContext(ProgressContext);
