import  { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';

const PrivateRoute = ({ children}) => {
    const { token } = useContext(AuthContext);

   

    return (
        token ? children : <Navigate to="/login" />
    );
};

export default PrivateRoute;
