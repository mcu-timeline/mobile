import { createContext } from 'react';

export type Progress = {
  id: string;
  activeTimeline: string;
};

type ProgressContext = {
  currentMovieId: string | null;
  activeTimeline: string | null;
  isLoading: boolean;
  setCurrentMovieId: (id: string) => void;
};

export const initialContext: ProgressContext = {
  currentMovieId: null,
  activeTimeline: null,
  isLoading: true,
  setCurrentMovieId: () => {},
};

export const ProgressContext = createContext<ProgressContext>(initialContext);
