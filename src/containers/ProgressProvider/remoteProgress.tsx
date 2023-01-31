import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { FCC } from '../../types';

import { ProgressContext } from './context';
import {
  GET_PROGRESS,
  Response,
  UpdateCurrentMovieParams,
  UPDATE_CURRENT_MOVIE,
  UpsertActiveTimelineParams,
  UPSERT_ACTIVE_TIMELINE,
} from './queries';

export const ProgressContextRemoteProvider: FCC = ({ children }) => {
  const { data, loading } = useQuery<Response<'getUserProgress'>>(GET_PROGRESS);
  const [mutateCurrentMovieId] = useMutation<Response<'updateCurrentMovie'>, UpdateCurrentMovieParams>(
    UPDATE_CURRENT_MOVIE,
  );
  const [mutateActiveTimeline] = useMutation<Response<'upsertActiveTimeline'>, UpsertActiveTimelineParams>(
    UPSERT_ACTIVE_TIMELINE,
  );

  const setCurrentMovieId = useCallback(
    (id: string) => {
      if (!data || !data.getUserProgress.activeTimeline) {
        return;
      }
      mutateCurrentMovieId({
        variables: {
          data: {
            currentMovieId: id,
            activeTimelineId: data.getUserProgress.activeTimeline,
          },
        },
        optimisticResponse: {
          updateCurrentMovie: {
            __typename: 'UserProgress',
            id: data.getUserProgress.id,
            userId: data.getUserProgress.userId,
            activeTimeline: data.getUserProgress.activeTimeline,
            currentMovieId: id,
          },
        },
      });
    },
    [data, mutateCurrentMovieId],
  );

  const setActiveTimeline = useCallback(
    (timeline: string, callback: () => void) => {
      mutateActiveTimeline({
        variables: {
          data: {
            activeTimelineId: timeline,
          },
        },
        onCompleted: callback,
      });
    },
    [mutateActiveTimeline],
  );

  const context = useMemo(() => {
    const currentMovieId = data?.getUserProgress.currentMovieId;
    const activeTimeline = data?.getUserProgress.activeTimeline;

    return {
      currentMovieId: currentMovieId ? currentMovieId : null,
      activeTimeline: activeTimeline ? activeTimeline : null,
      isLoading: loading,
      setActiveTimeline,
      setCurrentMovieId,
    };
  }, [data, setCurrentMovieId, loading]);

  return <ProgressContext.Provider value={context}>{children}</ProgressContext.Provider>;
};
