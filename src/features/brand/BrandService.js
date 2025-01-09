import { config } from "../../utils/axiosCofig"; // Assuming this contains headers or token
import { base_url } from "../../utils/base_url";

// Helper to get headers from config
const getHeaders = () => {
  const token = localStorage.getItem("user"); // Or get it from the Redux store
  return {
    ...config.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // If required
  };
};

// Fetch all brands
const getBrands = async () => {
  try {
    const response = await fetch(`${base_url}brand/`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands", error);
    throw error;
  }
};

// Create a new brand
const createBrand = async (brand) => {
  try {
    const response = await fetch(`${base_url}brand/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(brand),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get the error text from response
      throw new Error(`Failed to create brand: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating brand:", error);
    throw error;
  }
};

// Update an existing brand
const updateBrand = async (brand) => {
  try {
    const response = await fetch(`${base_url}brand/${brand.id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ title: brand.brandData.title }),
    });

    if (!response.ok) {
      throw new Error("Failed to update brand");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating brand", error);
    throw error;
  }
};

// Fetch a specific brand by ID
const getBrand = async (id) => {
  try {
    const response = await fetch(`${base_url}brand/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brand");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brand", error);
    throw error;
  }
};

// Delete a specific brand by ID
const deleteBrand = async (id) => {
  try {
    const response = await fetch(`${base_url}brand/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete brand");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting brand", error);
    throw error;
  }
};

// Exporting brandService as an object containing all the functions
const BrandService = {
  getBrands,
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
};

export default BrandService;
