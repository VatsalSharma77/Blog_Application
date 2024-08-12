import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const { token } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [token, navigate]);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <div>
                    <Link to="/admin/create">Create New Blog</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.author}</td>
                                    <td>{new Date(blog.Date).toLocaleDateString()}</td>
                                    <td>
                                        {blog.image ? (
                                            <img
                                                src={`${import.meta.env.VITE_APP_BACKEND_URL}/${blog.image}`}
                                                alt={blog.title}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        ) : (
                                            'No image'
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit/${blog._id}`}>Edit</Link>
                                        <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;
