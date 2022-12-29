import { useCallback, useMemo } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { FCC, UserProgress } from '../../types';

import { ProgressContext } from './context';

const GET_PROGRESS = gql`
  query {
    getUserProgress {
      id
      userId
      activeTimeline
      currentMovieId
    }
  }
`;

const UPDATE_PROGRESS = gql`
  mutation ($data: UpdateCurrentMovieInput) {
    updateCurrentMovie(updateCurrentMovieInput: $data) {
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
    currentMovieId: string;
  };
};

type QueryResponse = {
  getUserProgress: UserProgress;
};

type MutationResponse = {
  updateCurrentMovie: UserProgress;
};

export const ProgressContextRemoteProvider: FCC = ({ children }) => {
  const { data, loading } = useQuery<QueryResponse>(GET_PROGRESS);
  const [mutate] = useMutation<MutationResponse, Params>(UPDATE_PROGRESS);

  const setCurrentMovieId = useCallback(
    (id: string) => {
      if (!data || !data.getUserProgress.activeTimeline) {
        return;
      }
      mutate({
        variables: {
          data: {
            currentMovieId: id,
            activeTimelineId: data.getUserProgress.activeTimeline,
          },
        },
        optimisticResponse: {
          updateCurrentMovie: {
            id: data.getUserProgress.id,
            userId: data.getUserProgress.userId,
            activeTimeline: data.getUserProgress.activeTimeline,
            currentMovieId: id,
          },
        },
      });
    },
    [data, mutate],
  );

  const context = useMemo(() => {
    const currentMovieId = data?.getUserProgress.currentMovieId;
    const activeTimeline = data?.getUserProgress.activeTimeline;

    return {
      currentMovieId: currentMovieId ? currentMovieId : null,
      activeTimeline: activeTimeline ? activeTimeline : null,
      isLoading: loading,
      setCurrentMovieId,
    };
  }, [data, setCurrentMovieId, loading]);

  return <ProgressContext.Provider value={context}>{children}</ProgressContext.Provider>;
};
