import { createContext, useContext } from 'react';

import { AuthContextProps } from './types';

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth has to be used within ProvideAuth');
  }

  return context;
}
