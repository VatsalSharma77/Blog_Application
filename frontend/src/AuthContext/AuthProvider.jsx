import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));


    const login = async (email, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/login`, { email, password });
            console.log(res.data);
            const { token, user } = res.data;
            console.log(user.isAdmin)

            localStorage.setItem('token', token);

            setToken(token);
            setUser(user);
        } catch (err) {
            console.error(" Login  failed  again :", err);
            throw err;
        }
    };

    const register = async (username, email, password) => {
        try {
             await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/register`, { username, email, password });

          
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');

            setUser(null);
            setToken(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login,register, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
