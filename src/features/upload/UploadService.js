import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosCofig";

const uploadImg = async (data) => {
  const response = await fetch(`${base_url}upload/`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: data,
  });

  if (!response.ok) {
    // Log the response status or use response.clone() to log
    console.error("Upload failed with status:", response.status);
    throw new Error("Network response was not ok");
  }

  // If you need to log the response, use clone() to log and still read json
  const responseClone = response.clone(); // Clone the response
  console.log(await responseClone.text()); // Log response body for more details

  // Read JSON only once
  return response.json();
};

const deleteImg = async (id) => {
  const response = await fetch(`${base_url}upload/delete-img/${id}`, {
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

const UploadService = {
  uploadImg,
  deleteImg,
};

export default UploadService;
