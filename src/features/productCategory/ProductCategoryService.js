import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

const getProductCategories = async () => {
  const response = await fetch(`${base_url}category/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const createCategory = async (category) => {
  const response = await fetch(`${base_url}category/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const getProductCategory = async (id) => {
  const response = await fetch(`${base_url}category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const deleteProductCategory = async (id) => {
  const response = await fetch(`${base_url}category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const updateProductCategory = async (category) => {
  const response = await fetch(`${base_url}category/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
    body: JSON.stringify({ title: category.pCatData.title }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const ProductCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default ProductCategoryService;
