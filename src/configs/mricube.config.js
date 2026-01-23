import axios from "axios";

function getMRIAxios(token) {
  return axios.create({
    baseURL: "https://2760-portals.qubeglobalcloud.com/RestAPI/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getMRIAxios };
