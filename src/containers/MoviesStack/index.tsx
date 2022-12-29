import { gql, useQuery } from '@apollo/client';

import { Card } from '../../components/Card';
import { MainContainer } from '../../components/MainContainer';
import { Swiper } from '../Swiper';
import { useProgress } from '../../hooks';

const GET_MOVIES = gql`
  query ($title: String) {
    timeline(currentlyWatching: $title) {
      id
      name
      duration
    }
  }
`;

type Response = {
  timeline: Array<{ id: string; name: string; duration: string }>;
};

export const MoviesStack = () => {
  const { currentMovieId, setCurrentMovieId } = useProgress();
  const { data, previousData, loading } = useQuery<Response>(GET_MOVIES, {
    variables: { title: currentMovieId },
  });

  if (loading && !previousData) {
    return null;
  }

  const movies = data ? data.timeline : previousData?.timeline;

  return movies ? (
    <MainContainer>
      <Swiper Item={Card} items={movies} currentItem={currentMovieId} setCurrentItem={setCurrentMovieId} />
    </MainContainer>
  ) : null;
};
