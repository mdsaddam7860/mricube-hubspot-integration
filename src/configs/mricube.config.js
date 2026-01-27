import axios from "axios";

function getMRIAxios(token) {
  return axios.create({
    baseURL: process.env.MRI_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getMRIAxios };
