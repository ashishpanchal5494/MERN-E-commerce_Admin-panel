import { base_url } from "../../utils/base_url";

const getBrands = async () => {
  const response = await fetch(`${base_url}brand/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }
  return response.json();
};

const createBrand = async (brand) => {
  const response = await fetch(`${base_url}brand/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    },
    body: JSON.stringify(brand),
  });

  if (!response.ok) {
    throw new Error("Failed to create brand");
  }
  return response.json();
};

const updateBrand = async (brand) => {
  const response = await fetch(`${base_url}brand/${brand.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    },
    body: JSON.stringify({ title: brand.brandData.title }),
  });

  if (!response.ok) {
    throw new Error("Failed to update brand");
  }
  return response.json();
};

const getBrand = async (id) => {
  const response = await fetch(`${base_url}brand/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brand");
  }
  return response.json();
};

const deleteBrand = async (id) => {
  const response = await fetch(`${base_url}brand/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete brand");
  }
  return response.json();
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
