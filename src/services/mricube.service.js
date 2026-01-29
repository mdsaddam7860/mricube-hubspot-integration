import { logger, getMRIAxios, mriCubeTokenManager } from "../index.js";
import { mriExecutor } from "../utils/executors.js";

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
    logger.error("Error fetching units:", error.response?.data || error);
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

async function fetchProperties() {
  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);

    const allProperties = [];
    let page = 1;
    const pageSize = 100; // safe upper bound
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get("/properties", {
        params: {
          page,
          pageSize,
        },
      });

      const properties = response.data?.property || [];
      allProperties.push(...properties);

      // ---- Pagination detection (defensive) ----
      if (properties.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }

    logger.info(`Fetched ${allProperties.length} properties successfully`);
    return allProperties;
  } catch (error) {
    logger.error("Error fetching proeprties:", error.response?.data || error);
    throw error;
  }
}
async function fetchOwners() {
  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);

    const allOwners = [];
    let page = 1;
    const pageSize = 100; // safe upper bound
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get("/owners", {
        params: {
          page,
          pageSize,
        },
      });

      const owners = response.data?.owner || [];
      allOwners.push(...owners);

      // ---- Pagination detection (defensive) ----
      if (owners.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }

    logger.info(`Fetched ${allOwners.length} owners successfully`);
    return allOwners;
  } catch (error) {
    logger.error("Error fetching owners:", error.response?.data || error);
    throw error;
  }
}

async function createTenantInMRI(tenant) {
  try {
    //➡️ Create tenant in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.post("/tenants", tenant);

    return response.data;
  } catch (error) {
    logger.error(
      "Error creating Tenant in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updateTenantInMRI(tenant) {
  try {
    //➡️ Update tenant in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.put("/tenants", tenant);

    return response.data;
  } catch (error) {
    logger.error(
      "Error updating Tenant in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}
async function createUnittInMRI(unit) {
  try {
    //➡️ Create tenant in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.post("/units", unit);

    return response.data;
  } catch (error) {
    logger.error(
      "Error creating Unit in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updateUnittInMRI(unit) {
  try {
    //➡️ Update Unit in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.put("/units", unit);

    return response.data;
  } catch (error) {
    logger.error(
      "Error updating Unit in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}
async function createPropertytInMRI(property) {
  try {
    //➡️ Create Property in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.post("/properties", property);

    return response.data;
  } catch (error) {
    logger.error(
      "Error creating Property in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updatePropertytInMRI(property) {
  try {
    //➡️ Update Property in mri cube
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.put("/properties", property);

    return response.data;
  } catch (error) {
    logger.error(
      "Error Updating Property in MRI Cube:",
      error.response?.data || error
    );
    throw error;
  }
}

async function getRecordsById(endPoint, endPointId) {
  if (!endPoint || !endPointId) {
    throw new Error("Missing params for getRecordsById");
  }

  try {
    const accessToken = await mriCubeTokenManager.getToken();
    const axios = getMRIAxios(accessToken);
    const response = await axios.get(`/${endPoint}/${endPointId}`);

    return response.data;
  } catch (error) {
    logger.error(
      `Error getting ${endPoint} by id in MRI Cube:`,
      error.response?.data || error
    );
    throw error;
  }
}

export {
  getRecordsById,
  fetchUnits,
  fetchTenants,
  fetchProperties,
  fetchOwners,
  createUnittInMRI,
  updateUnittInMRI,
  createPropertytInMRI,
  updatePropertytInMRI,
  createTenantInMRI,
  updateTenantInMRI,
};
