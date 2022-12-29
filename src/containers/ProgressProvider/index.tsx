import { FCC } from '../../types';
import { useAuth } from '../../hooks';
import { USER } from '../../helpers';

import { ProgressContext, initialContext } from './context';
import { ProgressContextLocalProvider } from './localProgress';
import { ProgressContextRemoteProvider } from './remoteProgress';

export const ProgressContextProvider: FCC = ({ children }) => {
  const authContext = useAuth();

  if (authContext.type === USER.TYPE.LOCAL) {
    return <ProgressContextLocalProvider>{children}</ProgressContextLocalProvider>;
  }

  if (authContext.type === USER.TYPE.REMOTE) {
    return <ProgressContextRemoteProvider>{children}</ProgressContextRemoteProvider>;
  }

  return <ProgressContext.Provider value={initialContext}>{children}</ProgressContext.Provider>;
};
