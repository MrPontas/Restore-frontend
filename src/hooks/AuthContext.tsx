import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import { UserProps } from '../utils/props';

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthState {
  token: string;
  user: UserProps;
}

interface AuthContextData {
  user: UserProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  ensureAuthenticated(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ReStore:token');
    const user = localStorage.getItem('@ReStore:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post('sessions', {
      login,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@ReStore:token', `Bearer ${token}`);
    localStorage.setItem('@ReStore:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ReStore:token');
    localStorage.removeItem('@ReStore:user');

    setData({} as AuthState);
  }, []);

  const ensureAuthenticated = useCallback(async () => {
    await api.get('sessions').catch(() => {
      signOut();
    });
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, ensureAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
export { AuthProvider, useAuth };
