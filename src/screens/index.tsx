import { FC, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth, useProgress } from '../hooks';

import { RootStackParamList } from './types';
import { LoginScreen } from './Login';
import { LoadingScreen } from './Loading';
import { TimelinePickerScreen } from './TimelinePicker';
import { AppTabs } from './App';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Router = () => {
  const { isLoading, user } = useAuth();
  const { isLoading: isProgressLoading, activeTimeline } = useProgress();

  const screens = useMemo(() => {
    switch (true) {
      case !user:
        return <Stack.Screen name="Login" component={LoginScreen} />;
      case !activeTimeline:
        return <Stack.Screen name="TimelinePicker" component={TimelinePickerScreen} />;
      default:
        return <Stack.Screen name="App" component={AppTabs} />;
    }
  }, [user, activeTimeline]);

  if (isLoading || isProgressLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>{screens}</Stack.Navigator>
    </NavigationContainer>
  );
};
