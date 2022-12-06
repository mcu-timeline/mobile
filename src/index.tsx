import { StatusBar } from 'expo-status-bar';

import { ApolloClientProvider } from './containers/ApolloClient';
import { AuthContextProvider } from './containers/AuthProvider';
import { ProgressContextProvider } from './containers/ProgressProvider';
import { Router } from './screens';

export const App = () => (
  <ApolloClientProvider>
    <AuthContextProvider>
      <ProgressContextProvider>
        <Router />
        <StatusBar style="auto" />
      </ProgressContextProvider>
    </AuthContextProvider>
  </ApolloClientProvider>
);
