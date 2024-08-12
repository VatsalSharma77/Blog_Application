const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const auth = require("../middleware/authMiddlewware");
const upload = require("../multer/multer");

router.post("/create", auth, upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", auth, getBlogById);
router.put("/:id", auth,upload.single("image"), updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
