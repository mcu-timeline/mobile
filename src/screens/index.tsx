import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks';

import { RootStackParamList } from './types';
import { LoginScreen } from './Login';
import { HomeScreen } from './Home';
import { LoadingScreen } from './Loading';
import { TimelinePickerScreen } from './TimelinePicker';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Router = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TimelinePicker" component={TimelinePickerScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
