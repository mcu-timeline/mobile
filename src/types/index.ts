import { FC, ReactNode } from 'react';

export type FCC<T extends {} = {}> = FC<T & { children: ReactNode }>;

export type Movie = {
  __typename: 'Movie';
  id: string;
  title: string;
  duration: string;
  tags: string[];
  image: string;
  imageHero: string;
  imageCenter: number;
  description: string;
  note: string;
  characters: Character[];
};

type Character = {
  __typename: 'Character';
  name: string;
  image: string;
};

export type Timeline = {
  __typename: 'Timeline';
  id: string;
  name: string;
  description: string;
  image: string;
};
