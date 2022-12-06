import { StatusBar } from 'expo-status-bar';

import { AuthContextProvider } from './containers/AuthProvider';
import { Router } from './screens';

export const App = () => (
  <AuthContextProvider>
    <Router />
    <StatusBar style="auto" />
  </AuthContextProvider>
);
