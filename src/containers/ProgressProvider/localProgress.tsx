import { useCallback, useMemo } from 'react';

import { jsonParse } from '../../helpers';
import { FCC } from '../../types';
import { useAsyncStorage } from '../../hooks';

import { ProgressContext, Progress } from './context';

const isProgress = (o: any): o is Progress => {
  return 'id' in o && 'activeTimeline' in o;
};

const parseProgress = jsonParse(isProgress);

export const ProgressContextLocalProvider: FCC = ({ children }) => {
  const progressContext = useAsyncStorage('@progress', { parser: parseProgress, optimistic: true });

  const setCurrentMovieId = useCallback(
    async (id: string) => {
      if (!progressContext.data || !progressContext.data.activeTimeline) {
        return;
      }
      progressContext.setData({ id, activeTimeline: progressContext.data.activeTimeline });
    },
    [progressContext],
  );

  const setActiveTimeline = useCallback(
    async (id: string, callback?: () => void) => {
      await progressContext.setData({ id: null, activeTimeline: id });
      if (callback) {
        callback();
      }
    },
    [progressContext.setData],
  );

  const context = useMemo(
    () => ({
      currentMovieId: progressContext.data ? progressContext.data.id : null,
      activeTimeline: progressContext.data ? progressContext.data.activeTimeline : null,
      isLoading: progressContext.isLoading,
      setActiveTimeline,
      setCurrentMovieId,
    }),
    [progressContext],
  );

  return <ProgressContext.Provider value={context}>{children}</ProgressContext.Provider>;
};
