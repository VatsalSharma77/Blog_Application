import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        if (image) formData.append('image', image);

        try {
            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/create`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}` 
                },
            });
            navigate('/admin');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="admin-create">
            <h1>Create New Blog</h1>
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
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default AdminCreate;
