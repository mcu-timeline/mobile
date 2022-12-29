import { FC, ReactNode } from 'react';

export type FCC<T extends {} = {}> = FC<T & { children: ReactNode }>;

export type UserProgress = {
  id: string;
  userId: string;
  activeTimeline: string | null;
  currentMovieId: string | null;
};
