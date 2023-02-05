import { createContext } from 'react';

export type Progress = {
  id: string | null;
  activeTimeline: string;
};

type ProgressContext = {
  currentMovieId: string | null;
  activeTimeline: string | null;
  isLoading: boolean;
  setCurrentMovieId: (id: string) => void;
  setActiveTimeline: (id: string, callback?: () => void) => void;
};

export const initialContext: ProgressContext = {
  currentMovieId: null,
  activeTimeline: null,
  isLoading: true,
  setActiveTimeline: () => {},
  setCurrentMovieId: () => {},
};

export const ProgressContext = createContext<ProgressContext>(initialContext);
