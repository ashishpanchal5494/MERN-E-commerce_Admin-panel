// Import necessary configurations
import { base_url } from "../../utils/base_url";

// Function to get all users
const getUsers = async () => {
  const response = await fetch(`${base_url}user/all-users`, {
    method: "GET",
    headers: {
      // Add any required headers here
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data;
};

// Export the customerService object with the fetch-based methods
const CustomerService = {
  getUsers,
};

export default CustomerService;
