import { Auth0Provider } from 'react-native-auth0';

import { ApolloClientProvider } from './containers/ApolloClient';
import { AuthContextProvider } from './containers/AuthProvider';
import { ProgressContextProvider } from './containers/ProgressProvider';
import { Router } from './screens';

export const App = () => (
  <Auth0Provider domain={'franchise-tracker.eu.auth0.com'} clientId={'TbimV7cIUwYIcg6apLwVC3wsgAEh6rWs'}>
    <AuthContextProvider>
      <ApolloClientProvider>
        <ProgressContextProvider>
          <Router />
        </ProgressContextProvider>
      </ApolloClientProvider>
    </AuthContextProvider>
  </Auth0Provider>
);
