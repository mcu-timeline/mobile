import { FC, ReactNode } from 'react';

export type FCC<T extends {} = {}> = FC<T & { children: ReactNode }>;
