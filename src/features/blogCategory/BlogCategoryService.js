import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig"; // Assuming this has headers or token config

const getBlogCategories = async () => {
  const response = await fetch(`${base_url}blogcategory/`, {
    method: "GET",
    headers: config.headers, // assuming config has headers property
  });

  const data = await response.json();
  return data;
};

const createBlogCategory = async (bcat) => {
  const response = await fetch(`${base_url}blogcategory/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Spread other possible headers like authorization
    },
    body: JSON.stringify(bcat),
  });

  const data = await response.json();
  return data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await fetch(`${base_url}blogcategory/${blogCat.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify({ title: blogCat.blogCatData.title }),
  });

  const data = await response.json();
  return data;
};

const getBlogCategory = async (id) => {
  const response = await fetch(`${base_url}blogcategory/${id}`, {
    method: "GET",
    headers: config.headers,
  });

  const data = await response.json();
  return data;
};

const deleteBlogCategory = async (id) => {
  const response = await fetch(`${base_url}blogcategory/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });

  const data = await response.json();
  return data;
};

const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default BlogCategoryService;
