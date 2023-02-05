import { gql, useQuery } from '@apollo/client';

import { Swiper } from '../Swiper';
import { useProgress } from '../../hooks';
import { Movie } from '../../types';

const GET_MOVIES = gql`
  query ($timeline: String!, $title: String) {
    timeline(timeline: $timeline, currentlyWatching: $title) {
      id
      title
      duration
      tags
      image
      imageHero
      imageCenter
      description
      note
      characters {
        name
        image
      }
    }
  }
`;

type Response = {
  timeline: Movie[];
};

export const MoviesStack = () => {
  const { currentMovieId, setCurrentMovieId, activeTimeline } = useProgress();
  const { data, previousData, loading } = useQuery<Response>(GET_MOVIES, {
    variables: { timeline: activeTimeline, title: currentMovieId },
  });

  if (loading && !previousData) {
    return null;
  }

  const movies = data ? data.timeline : previousData?.timeline;

  return movies ? <Swiper items={movies} currentItem={currentMovieId} setCurrentItem={setCurrentMovieId} /> : null;
};
