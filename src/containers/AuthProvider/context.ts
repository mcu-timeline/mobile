import { createContext } from 'react';

export type User = {
  name: string;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  login: (username: string) => void;
  logout: () => void;
};

const initialContext: AuthContext = {
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContext>(initialContext);
