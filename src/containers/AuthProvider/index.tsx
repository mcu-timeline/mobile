import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';

import { jsonParse, USER } from '../../helpers';
import { FCC } from '../../types';
import { useAsyncStorage } from '../../hooks';
import { AuthContext, User, UserType } from './context';

const isUser = (o: any): o is User => {
  return 'name' in o;
};

const parseUser = jsonParse(isUser);

export const AuthContextProvider: FCC = ({ children }) => {
  const authContext = useAsyncStorage('@user', { parser: parseUser });
  const auth0Context = useAuth0();
  const [type, setType] = useState<UserType>(USER.TYPE.LOCAL);
  useEffect(() => {
    if (auth0Context.user) {
      setType(USER.TYPE.REMOTE);
    } else {
      setType(USER.TYPE.LOCAL);
    }
  }, [auth0Context.user]);

  const login = useCallback(
    (type: UserType) => {
      switch (type) {
        case USER.TYPE.LOCAL:
          return authContext.setData({ name: 'Anonymous' });
        case USER.TYPE.REMOTE:
          return auth0Context.authorize();
      }
    },
    [type, authContext.setData, auth0Context.authorize],
  );

  const logout = useCallback(() => {
    switch (type) {
      case USER.TYPE.LOCAL:
        return authContext.clearData();
      case USER.TYPE.REMOTE:
        return auth0Context.clearSession();
    }
  }, [type, authContext.clearData, auth0Context.clearSession]);

  const refresh = useCallback(() => {
    switch (type) {
      case USER.TYPE.LOCAL:
        return;
      case USER.TYPE.REMOTE:
        return auth0Context.getCredentials();
    }
  }, [type, auth0Context.getCredentials]);

  const userData = useMemo(() => {
    switch (type) {
      case USER.TYPE.LOCAL:
        return {
          user: authContext.data,
          isLoading: authContext.isLoading,
        };
      case USER.TYPE.REMOTE:
        return {
          user: auth0Context.user,
          isLoading: !auth0Context.user,
        };
    }
  }, [type, authContext, auth0Context]);

  const context = useMemo(
    () => ({
      ...userData,
      type,
      login,
      logout,
      refresh,
    }),
    [userData, type, login, logout, refresh],
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
