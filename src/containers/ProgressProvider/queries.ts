import { gql } from '@apollo/client';

export type UserProgress = {
  __typename: 'UserProgress';
  id: string;
  userId: string;
  activeTimeline: string | null;
  currentMovieId: string | null;
};

export type Response<Key extends string> = {
  [key in Key]: UserProgress;
};

export const GET_PROGRESS = gql`
  query {
    getUserProgress {
      id
      userId
      activeTimeline
      currentMovieId
    }
  }
`;

export const UPDATE_CURRENT_MOVIE = gql`
  mutation ($data: UpdateCurrentMovieInput) {
    updateCurrentMovie(updateCurrentMovieInput: $data) {
      id
      userId
      activeTimeline
      currentMovieId
    }
  }
`;

export type UpdateCurrentMovieParams = {
  data: {
    activeTimelineId: string;
    currentMovieId: string;
  };
};

export const UPSERT_ACTIVE_TIMELINE = gql`
  mutation ($data: UpsertActiveTimelineInput) {
    upsertActiveTimeline(upsertActiveTimelineInput: $data) {
      id
      userId
      activeTimeline
      currentMovieId
    }
  }
`;

export type UpsertActiveTimelineParams = {
  data: {
    activeTimelineId: string;
  };
};
