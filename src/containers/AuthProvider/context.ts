import { createContext } from 'react';

import { USER } from '../../helpers';

export type User = {
  name: string;
};

export type UserType = typeof USER.TYPE[keyof typeof USER.TYPE];

type AuthContext = {
  type: UserType;
  user: User | null;
  isLoading: boolean;
  login: (type: UserType) => void;
  logout: () => void;
  refresh: () => void;
};

const initialContext: AuthContext = {
  type: USER.TYPE.LOCAL,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refresh: () => {},
};

export const AuthContext = createContext<AuthContext>(initialContext);
