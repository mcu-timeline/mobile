import { useMemo } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuth } from '../../hooks';
import { FCC } from '../../types';

const httpLink = createHttpLink({
  // TODO: find a way how to handle correctly config variables
  uri: '/graphql',
});

export const ApolloClientProvider: FCC = ({ children }) => {
  const { user, refresh } = useAuth();

  const authLink = useMemo(
    () =>
      setContext(async (_, { headers }) => {
        const tokens = await refresh();
        return {
          headers: {
            ...headers,
            authorization: tokens ? `Bearer ${tokens.accessToken}` : '',
          },
        };
      }),
    [user],
  );

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
