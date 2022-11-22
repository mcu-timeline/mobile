import { useContext } from 'react';

import { AuthContext } from '../containers/AuthProvider';

export const useAuth = () => useContext(AuthContext);
