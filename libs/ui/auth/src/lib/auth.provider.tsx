import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { Login, User } from '@hr-acuity/ui/generated';

import { AuthContext } from './auth.context';
import { AuthContextProps, ProvidedAuthProps } from './types';

export function ProvideAuth({ children, getUser, login, logout }: PropsWithChildren<ProvidedAuthProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = getUser();

    if (existing) {
      setUser(existing);
    }

    setLoading(false);
  }, [getUser]);

  const memoGetUser = useCallback(() => {
    const user = getUser();
    setUser(user);
    return user;
  }, [getUser]);

  const memoLogin = useCallback(async (credentials: Login) => {
    setError('');
    setLoading(true);

    try {
      const authed = await login(credentials);
      setUser(authed);
      return authed;
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }

    return null;
  }, [login]);

  const memoLogout = useCallback(() => {
    logout();
    setUser(null);
  }, [logout]);

  const auth: AuthContextProps = {
    getUser: memoGetUser,
    login: memoLogin,
    logout: memoLogout,
    loading,
    error,
    user
  };

  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}
