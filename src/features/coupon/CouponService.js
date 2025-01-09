// Import necessary configurations
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

// Get all coupons function
const getCoupons = async () => {
  const response = await fetch(`${base_url}coupon/`, {
    method: "GET",
    headers: config.headers, // Assuming config.headers contains necessary headers like Authorization
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coupons");
  }

  const data = await response.json();
  return data;
};

// Create a new coupon function
const createCoupons = async (coupon) => {
  const response = await fetch(`${base_url}coupon/`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coupon),
  });

  if (!response.ok) {
    throw new Error("Failed to create coupon");
  }

  const data = await response.json();
  return data;
};

// Update an existing coupon function
const updateCoupon = async (coupon) => {
  const response = await fetch(`${base_url}coupon/${coupon.id}`, {
    method: "PUT",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update coupon");
  }

  const data = await response.json();
  return data;
};

// Get a single coupon by ID function
const getCoupon = async (id) => {
  const response = await fetch(`${base_url}coupon/${id}`, {
    method: "GET",
    headers: config.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coupon");
  }

  const data = await response.json();
  return data;
};

// Delete a coupon by ID function
const deleteCoupon = async (id) => {
  const response = await fetch(`${base_url}coupon/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete coupon");
  }

  const data = await response.json();
  return data;
};

// Export the couponService object with the fetch-based methods
const CouponService = {
  getCoupons,
  createCoupons,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default CouponService;
