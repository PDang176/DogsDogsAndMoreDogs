import { Routes, Route } from 'react-router';
import PrivateRoute from './routes/PrivateRoute';
import Login from './routes/Login';
import Search from './routes/Search';

const App = () => {
  return (
    <Routes>
      <Route index element={<PrivateRoute element={<Search />} />} />
      <Route path="login" element={<Login />} />
      <Route path="favorites" element={<div />} />
    </Routes>
  );
};

////////////////////////////////////////////////////////////////////////////////

export default App;
