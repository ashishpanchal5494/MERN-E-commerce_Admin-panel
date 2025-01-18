// Import any necessary configurations
import { config } from "../../utils/axiosCofig";
import { base_url } from "../../utils/base_url";

// Login function
const login = async (user) => {
  const response = await fetch(`${base_url}user/admin-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

// Get all orders function
const getOrders = async () => {
  const response = await fetch(`${base_url}user/getallorders`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();
  return data;
};

const updateOrder = async (data) => {
  const response = await fetch(`${base_url}user/updateOrder/${data.orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify({ status: data.status, email: data.email }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  return await response.json();
};

// Get specific order by user ID function
const getOrder = async (id) => {
  const response = await fetch(`${base_url}user/getorderbyuser/${id}`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: null, // The equivalent of sending an empty string in `fetch`
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  const data = await response.json();
  return data;
};

// AuthService.js
const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // Adjust based on how your token is stored

  const response = await fetch(`${base_url}user/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  // Remove user from local storage and clear token
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  getOrders,
  getOrder,
  logout,
  updateOrder,
};

export default AuthService;
