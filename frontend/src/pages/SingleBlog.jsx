import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/${id}`);
        setBlog(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the blog post:", error);
        setError("Error fetching the blog post.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p>Loading blog...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="single-blog-container">
      {blog && (
        <div className="blog-content">
          <h1>{blog.title}</h1>
          <p className="blog-author">by {blog.author}</p>
          <p className="blog-date">{new Date(blog.Date).toLocaleDateString()}</p>
          {blog.image && (
            <img
              src={`${import.meta.env.VITE_APP_BACKEND_URL}/${blog.image}`}
              alt={blog.title}
              className="blog-image"
            />
          )}
          <p className="blog-body">{blog.content}</p>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
