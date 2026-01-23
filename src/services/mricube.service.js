import { logger, getMRIAxios } from "../index.js";
async function fetchUnits() {
  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);

    const response = await axios.get(`/units`);

    return response.data?.unit;
  } catch (error) {
    logger.error(`Error fetching units:`, error.response?.data || error);
    throw error;
  }
}

async function fetchTenants() {
  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);

    const response = await axios.get(`/tenants`);

    return response.data?.tenant;
  } catch (error) {
    logger.error("Error fetching tenants:", error.response?.data || error);
    throw error;
  }
}

export { fetchUnits, fetchTenants };
