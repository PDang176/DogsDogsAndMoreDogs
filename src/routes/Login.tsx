import { useAuthContext } from '../contexts/AuthProvider';

const Login = () => {
  const { onLogin } = useAuthContext();

  return (
    <div>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
