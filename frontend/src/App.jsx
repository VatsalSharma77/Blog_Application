
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './components/Admin';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import PrivateRoute from './components/PrivateRoute';
import AdminCreate from './components/AdminCreate';
import AdminEdit from './components/AdminEdit';
import SingleBlog from './pages/SingleBlog';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        } />
        <Route path="/blog/:id" element={
          <PrivateRoute>
            <SingleBlog />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
        <Route path="/admin/create" element={<PrivateRoute><AdminCreate /></PrivateRoute>} />
        <Route path="/admin/edit/:id" element={<PrivateRoute><AdminEdit /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
