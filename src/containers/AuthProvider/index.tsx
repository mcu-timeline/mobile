import { useCallback, useMemo } from 'react';

import { jsonParse } from '../../helpers';
import { FCC } from '../../types';
import { useAsyncStorage } from '../../hooks';
import { AuthContext, User } from './context';

const isUser = (o: any): o is User => {
  return 'name' in o;
};

const parseUser = jsonParse(isUser);

export const AuthContextProvider: FCC = ({ children }) => {
  const authContext = useAsyncStorage('@user', { parser: parseUser });

  const login = useCallback(async (username: string) => authContext.setData({ name: username }), [authContext.setData]);

  const context = useMemo(
    () => ({
      user: authContext.data,
      isLoading: authContext.isLoading,
      login,
      logout: authContext.clearData,
    }),
    [authContext],
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
