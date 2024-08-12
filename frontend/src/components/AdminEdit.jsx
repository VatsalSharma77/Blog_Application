import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEdit = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/${id}`, {
                    headers: { authorization: `Bearer ${token}` },
                });
                const { title, content, author, image } = response.data;
                setTitle(title);
                setContent(content);
                setAuthor(author);
                setImage(image);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        if (image) formData.append('image', image);

        try {
            await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/${id}`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}` 
                },
            });
            navigate('/admin');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className="admin-edit">
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default AdminEdit;
