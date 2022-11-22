import { useState, createContext, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jsonParse } from '../../helpers';
import { FCC } from '../../types';

type User = {
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

const isUser = (o: any): o is User => {
  return 'name' in o;
};

const parseUser = jsonParse(isUser);

export const AuthContext = createContext<AuthContext>(initialContext);

export const AuthContextProvider: FCC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      const user = jsonValue != null ? parseUser(jsonValue) : null;
      setUser(user);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      // saving error
    }
  };

  useEffect(() => {
    getUserFromStorage();
  });

  const login = useCallback(
    async (username: string) => {
      try {
        const user = { name: username };
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        setUser(user);
      } catch (e) {
        // saving error
      }
    },
    [setUser],
  );

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (e) {
      // saving error
    }
  }, [setUser]);

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};
