import { useCallback, useMemo } from 'react';

import { jsonParse } from '../../helpers';
import { FCC } from '../../types';
import { useAsyncStorage } from '../../hooks';

import { ProgressContext, Progress } from './context';

const isProgress = (o: any): o is Progress => {
  return 'id' in o;
};

const parseProgress = jsonParse(isProgress);

export const ProgressContextLocalProvider: FCC = ({ children }) => {
  const progressContext = useAsyncStorage('@progress', { parser: parseProgress, optimistic: true });

  const setCurrentMovieId = useCallback(
    async (id: string) => progressContext.setData({ id }),
    [progressContext.setData],
  );

  const context = useMemo(
    () => ({
      currentMovieId: progressContext.data,
      isLoading: progressContext.isLoading,
      setCurrentMovieId,
    }),
    [progressContext],
  );

  return <ProgressContext.Provider value={context}>{children}</ProgressContext.Provider>;
};
