import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

const getEnquiries = async () => {
  const response = await fetch(`${base_url}enquiry/`, {
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

const deleteEnquiry = async (id) => {
  const response = await fetch(`${base_url}enquiry/${id}`, {
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

const getEnquiry = async (id) => {
  const response = await fetch(`${base_url}enquiry/${id}`, {
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

const updateEnquiry = async (enq) => {
  const response = await fetch(`${base_url}enquiry/${enq.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config.headers, // Apply any additional headers from config
    },
    body: JSON.stringify({ status: enq.enqData }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const EnquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default EnquiryService;
