import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

const getProducts = async () => {
  const response = await fetch(`${base_url}product/`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  });
  const data = await response.json();
  return data;
};

const createProduct = async (product) => {
  const response = await fetch(`${base_url}product/`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

const updateProduct = async (product) => {
  const response = await fetch(`${base_url}product/${product.id}`, {
    method: "PUT",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      color: product.productData.color,
      quantity: product.productData.quantity,
      images: product.productData.images,
    }),
  });
  const data = await response.json();
  return data;
};

const getProduct = async (id) => {
  const response = await fetch(`${base_url}product/${id}`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  });
  const data = await response.json();
  return data;
};

const deleteProduct = async (id) => {
  const response = await fetch(`${base_url}product/${id}`, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  });
  const data = await response.json();
  return data;
};

const ProductService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};

export default ProductService;
