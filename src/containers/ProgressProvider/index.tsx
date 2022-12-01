import { FCC } from '../../types';
import { useAuth } from '../../hooks';

import { ProgressContext, initialContext } from './context';
import { ProgressContextLocalProvider } from './localProgress';

export const ProgressContextProvider: FCC = ({ children }) => {
  const authContext = useAuth();

  // TODO: Change it to checking user type instead of name
  if (authContext.user?.name === 'local') {
    return <ProgressContextLocalProvider>{children}</ProgressContextLocalProvider>;
  }

  // TODO: add IF statement for checking if user is authenticated against Auth Service and use Progress API in that case

  return <ProgressContext.Provider value={initialContext}>{children}</ProgressContext.Provider>;
};
