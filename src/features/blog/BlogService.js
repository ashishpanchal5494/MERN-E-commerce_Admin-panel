// Import any necessary configurations
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

// Get all blogs function
const getBlogs = async () => {
  const response = await fetch(`${base_url}blog/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data;
};

// Create a new blog function
const createBlog = async (blog) => {
  const response = await fetch(`${base_url}blog/`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  const data = await response.json();
  return data;
};

// Update an existing blog function
const updateBlog = async (blog) => {
  const response = await fetch(`${base_url}blog/${blog.id}`, {
    method: "PUT",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  const data = await response.json();
  return data;
};

// Get a single blog by ID function
const getBlog = async (id) => {
  const response = await fetch(`${base_url}blog/${id}`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await response.json();
  return data;
};

// Delete a blog by ID function
const deleteBlog = async (id) => {
  const response = await fetch(`${base_url}blog/${id}`, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  const data = await response.json();
  return data;
};

// Export the blogService object with the new fetch-based methods
const BlogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default BlogService;
