import { useNavigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthProvider';
import { useEffect } from 'react';

const Login = () => {
  const { isAuthenticated, onLogin, onLogout } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <button onClick={onLogin}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Login;
