import { Navigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthProvider';

type PrivateRouteType = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteType) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
