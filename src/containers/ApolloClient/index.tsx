import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { FCC } from '../../types';

const client = new ApolloClient({
  // TODO: find a way how to handle correctly config variables
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export const ApolloClientProvider: FCC = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;
