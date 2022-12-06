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
  // TODO: remove hardcoded title when Content API supports empty params for getting first item
  const currentMovie = currentMovieId ? currentMovieId.id : 'Agent Carter S1:E02 Bridge and Tunnel';
  const { data, previousData } = useQuery<Response>(GET_MOVIES, {
    variables: { title: currentMovie },
  });

  const movies = data ? data.timeline : previousData?.timeline;

  return movies ? (
    <MainContainer>
      <Swiper Item={Card} items={movies} currentItem={currentMovie} setCurrentItem={setCurrentMovieId} />
    </MainContainer>
  ) : null;
};
