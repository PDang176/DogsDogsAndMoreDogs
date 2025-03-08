import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextInterface {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const url = 'https://frontend-take-home-service.fetch.com';

  const onLogin = () => {
    fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: 'Patrick',
        email: 'patrickdangt@gmail.com',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Login Error:' + error.message);
      });
  };

  const onLogout = () => {
    fetch(`${url}/auth/logout`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error('Login Error:' + error.message);
      });
  };

  const value = {
    isAuthenticated,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
