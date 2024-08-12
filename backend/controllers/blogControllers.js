const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? req.file.path : ""; 

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      image,
    });

    const blog = await newBlog.save();
    res.status(201).json(blog); 
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Server error: Unable to create blog" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Server error: Unable to fetch blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog); 
  } catch (err) {
    console.error("Error fetching blog:", err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(500).json({ error: "Server error: Unable to fetch blog" });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? req.file.path : null; 

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    if (image) {
      blog.image = image;
    }

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog); 
  } catch (err) {
    console.error("Error updating blog:", err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(500).json({ error: "Server error: Unable to update blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ error: "Blog not found" });
    }
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Server error: Unable to delete blog" });
  }
};
