import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

interface AuthContextInterface {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const checkIsAuthenticated = sessionStorage.getItem('isAuthenticated');
    return checkIsAuthenticated ? JSON.parse(checkIsAuthenticated) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const url = 'https://frontend-take-home-service.fetch.com';

  const navigate = useNavigate();

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
        navigate('/');
      })
      .catch((error) => {
        console.error('Login Error:' + error.message);
      });
  };

  const onLogout = () => {
    fetch(`${url}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        setIsAuthenticated(false);
        navigate('/login');
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
