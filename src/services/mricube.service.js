import { logger, getMRIAxios, mriCubeTokenManager } from "../index.js";
async function fetchUnits() {
  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);

    const allUnits = [];
    let page = 1;
    const pageSize = 100; // safe upper bound
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get("/units", {
        params: {
          page,
          pageSize,
        },
      });

      const units = response.data?.unit || [];
      allUnits.push(...units);

      // ---- Pagination detection (defensive) ----
      if (units.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }

    logger.info(`Fetched ${allUnits.length} units successfully`);
    return allUnits;
  } catch (error) {
    logger.error(
      "Error fetching units:",
      error.response?.data || error.message
    );
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
