// Import any necessary configurations
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

// Get all colors function
const getColors = async () => {
  const response = await fetch(`${base_url}color/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch colors");
  }

  const data = await response.json();
  return data;
};

// Create a new color function
const createColor = async (color) => {
  const response = await fetch(`${base_url}color/`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(color),
  });

  if (!response.ok) {
    throw new Error("Failed to create color");
  }

  const data = await response.json();
  return data;
};

// Update an existing color function
const updateColor = async (color) => {
  const response = await fetch(`${base_url}color/${color.id}`, {
    method: "PUT",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: color.colorData.title,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update color");
  }

  const data = await response.json();
  return data;
};

// Get a single color by ID function
const getColor = async (id) => {
  const response = await fetch(`${base_url}color/${id}`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch color");
  }

  const data = await response.json();
  return data;
};

// Delete a color by ID function
const deleteColor = async (id) => {
  const response = await fetch(`${base_url}color/${id}`, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete color");
  }

  const data = await response.json();
  return data;
};

// Export the ColorService object with the new fetch-based methods
const ColorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default ColorService;
