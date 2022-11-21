import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
};

const isUser = (o: any): o is User => {
  return 'name' in o;
};

const jsonParse =
  <T>(typeguard: (o: any) => o is T) =>
  (text: string): T => {
    const parsed = JSON.parse(text);
    if (typeguard(parsed)) {
      return parsed;
    }
    throw new Error('Parsing Error');
  };

const parseUser = jsonParse(isUser);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

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
  }, []);

  const logIn = async (username: string) => {
    try {
      const user = { name: username };
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUser(user);
      const jsonValue = await AsyncStorage.getItem('@user');
    } catch (e) {
      // saving error
    }
  };

  return { user, isLoading, logIn };
};
