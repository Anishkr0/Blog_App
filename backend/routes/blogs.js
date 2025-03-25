const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

// Get all blogs & Create a blog
router.route("/").get(getBlogs).post(protect, createBlog);

// Get user blogs
router.get("/user", protect, getUserBlogs);

// Get, update, and delete blog by ID
router
  .route("/:id")
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
