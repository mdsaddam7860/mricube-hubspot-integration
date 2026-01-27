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
  getOwners,
  getOwnerById,
  getProperties,
  upsertOwner,
} from "./services/hubspot.service.js";

import { ownerProperties, ownerPayload } from "./utils/hubspot.util.js";
// import {} from "";

export {
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
