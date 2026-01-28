import { logger } from "./utils/winston.logger.js";
import {
  axiosInstance,
  hubspotClient,
  getHubspotClient,
} from "./configs/hubspot.config.js";
import {
  fetchToken,
  mriCubeTokenManager,
} from "./services/auth/tokenManager.js";
import { getMRIAxios } from "./configs/mricube.config.js";
import {
  fetchUnits,
  fetchTenants,
  fetchProperties,
  fetchOwners,
} from "./services/mricube.service.js";
import { syncTenantsToHubspot } from "./controllers/tenant2way.controller.js";
import { syncUnitsToHubspot } from "./controllers/unit2way.controller.js";
import { syncPropertiesToHubspot } from "./controllers/property2way.controller.js";
import { syncOwnersToHubspot } from "./controllers/owner1way.controller.js";

import {
  updateProperty,
  createProperty,
  getOwners,
  getOwnerById,
  getProperties,
  upsertOwner,
  updateOwner,
  createOwner,
  creatUnit,
  updateUnit,
  creatTenant,
  updateTenant,
} from "./services/hubspot.service.js";

import {
  ownerPayload,
  unitPayload,
  propertyPayload,
  tenantPayload,
  ownerProperties,
  unitProperties,
  tenantProperties,
  propertyProperties,
} from "./utils/hubspot.util.js";

// import {} from "";

export {
  tenantPayload,
  unitProperties,
  tenantProperties,
  propertyProperties,
  unitPayload,
  propertyPayload,
  updateProperty,
  createProperty,
  createOwner,
  updateOwner,
  creatUnit,
  updateUnit,
  creatTenant,
  updateTenant,
  ownerPayload,
  upsertOwner,
  ownerProperties,
  getOwnerById,
  getProperties,
  getOwners,
  syncOwnersToHubspot,
  syncPropertiesToHubspot,
  fetchProperties,
  fetchOwners,
  syncUnitsToHubspot,
  syncTenantsToHubspot,
  fetchUnits,
  fetchTenants,
  getMRIAxios,
  logger,
  axiosInstance,
  hubspotClient,
  getHubspotClient,
  fetchToken,
  mriCubeTokenManager,
};
