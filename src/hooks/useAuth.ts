import { useContext } from 'react';

import { AuthContext } from '../containers/AuthProvider/context';

export const useAuth = () => useContext(AuthContext);
