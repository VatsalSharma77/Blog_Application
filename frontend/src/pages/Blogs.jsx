import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";
import axios from "axios";

const Blogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog`);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blogs-container">
      {user && user.isAdmin === true && (
        <div className="admin-link">
          <Link to="/admin">
            <button className="admin-button">Go to Admin Page</button>
          </Link>
        </div>
      )}

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <h2>{blog.title}</h2>
              <p>by {blog.author}</p>
              <p>{new Date(blog.Date).toLocaleDateString()}</p>
              {blog.image && (
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND_URL}/${blog.image}`}
                  alt={blog.title}
                  className="blog-image"
                />
              )}
              <p>{blog.content.substring(0, 100)}...</p>
              <Link to={`/blog/${blog._id}`}>
                <button className="read-more-button">Read More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
