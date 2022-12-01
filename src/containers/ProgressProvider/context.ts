import { createContext } from 'react';

export type Progress = {
  id: string;
};

type ProgressContext = {
  currentMovieId: Progress | null;
  isLoading: boolean;
  setCurrentMovieId: (id: string) => void;
};

export const initialContext: ProgressContext = {
  currentMovieId: null,
  isLoading: true,
  setCurrentMovieId: () => {},
};

export const ProgressContext = createContext<ProgressContext>(initialContext);
