import { gql, useQuery } from '@apollo/client';

import { Timeline } from '../../types';

type Response = {
  timelines: Timeline[];
};

const GET_TIMELINES = gql`
  query {
    timelines {
      id
      name
      description
      image
    }
  }
`;

export const useGetTimelines = () => useQuery<Response>(GET_TIMELINES);
