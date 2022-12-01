import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AsyncStorageHook<Data> = State<Data> & {
  setData: (data: Data) => void;
  clearData: () => void;
};

type State<Data> = {
  data: Data | null;
  gettingError: Error | null;
  savingError: Error | null;
  isLoading: boolean;
  isSaving: boolean;
};

const initialState = {
  data: null,
  gettingError: null,
  savingError: null,
  isLoading: true,
  isSaving: false,
};

export const useAsyncStorage = <Data extends {}>(
  key: string,
  options: {
    parser: (json: string) => Data;
    optimistic?: boolean;
  },
): AsyncStorageHook<Data> => {
  const [state, setState] = useState<State<Data>>(initialState);

  const getDataFromStorage = async () => {
    setState((previousState) => ({ ...previousState, isLoading: true }));
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue !== null ? options.parser(jsonValue) : null;
      setState((previousState) => ({ ...previousState, data, gettingError: null, isLoading: false }));
    } catch (e) {
      const error = new Error(`Error while getting data from storage for key ${key}`);
      setState((previousState) => ({ ...previousState, data: null, gettingError: error, isLoading: false }));
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const setData = useCallback(
    async (data: Data) => {
      let previousData: Data | null = null;
      setState((previousState) => {
        previousData = previousState.data;
        return {
          ...previousState,
          data: options.optimistic ? data : previousData,
          isSaving: true,
        };
      });
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        setState((previousState) => ({ ...previousState, data, savingError: null, isSaving: false }));
      } catch (e) {
        const error = new Error(`Error while saving data from storage for key ${key}`);
        setState((previousState) => ({ ...previousState, data: previousData, savingError: error, isSaving: false }));
      }
    },
    [setState],
  );

  const clearData = useCallback(async () => {
    let previousData: Data | null = null;
    setState((previousState) => {
      previousData = previousState.data;
      return {
        ...previousState,
        data: options.optimistic ? null : previousData,
        isSaving: true,
      };
    });
    try {
      await AsyncStorage.removeItem(key);
      setState((previousState) => ({ ...previousState, data: null, savingError: null, isSaving: false }));
    } catch (e) {
      const error = new Error(`Error while removing data from storage for key ${key}`);
      setState((previousState) => ({ ...previousState, data: previousData, savingError: error, isSaving: false }));
    }
  }, [setState]);

  return useMemo(
    () => ({
      ...state,
      setData,
      clearData,
    }),
    [state, setData, clearData],
  );
};
