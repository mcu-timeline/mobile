import { createContext } from 'react';
import { Credentials, Auth0User } from 'react-native-auth0';

import { USER } from '../../helpers';

export type User = {
  name: string;
};

export type UserType = typeof USER.TYPE[keyof typeof USER.TYPE];

type LocalAuthContext = {
  type: typeof USER.TYPE.LOCAL;
  user: User | null;
  isLoading: boolean;
  login: (type: UserType) => void;
  logout: () => void;
  refresh: () => null | Promise<Credentials>;
};

type RemoteAuthContext = {
  type: typeof USER.TYPE.REMOTE;
  user: Auth0User<{}> | null;
  isLoading: boolean;
  login: (type: UserType) => void;
  logout: () => void;
  refresh: () => null | Promise<Credentials>;
};

type AuthContext = LocalAuthContext | RemoteAuthContext;

const initialContext: AuthContext = {
  type: USER.TYPE.LOCAL,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refresh: () => null,
};

export const AuthContext = createContext<AuthContext>(initialContext);
