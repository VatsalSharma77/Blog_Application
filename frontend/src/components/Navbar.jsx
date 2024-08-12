// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h1>My Blog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                {user && user.role === 'admin' && (
                    <li><Link to="/admin">Admin</Link></li>
                )}
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
