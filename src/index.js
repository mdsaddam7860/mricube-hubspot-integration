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
import {
  syncTenantsToHubspot,
  syncHSTenantsToMRI,
} from "./controllers/tenant2way.controller.js";
import {
  syncUnitsToHubspot,
  syncHSUnitsToMRI,
} from "./controllers/unit2way.controller.js";
import {
  syncPropertiesToHubspot,
  syncHSPropertyToMRI,
} from "./controllers/property2way.controller.js";
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
  getTenantsHS,
  getUnitsHS,
  getPropertiesHS,
} from "./services/hubspot.service.js";

import {
  ownerProperties,
  unitProperties,
  tenantProperties,
  propertyProperties,
} from "./utils/hubspot.util.js";

import {
  mri_unit_payload,
  mri_tenant_payload,
  mri_property_payload,
} from "./mapppers/mri_cube.mapping.js";
import {
  ownerPayload,
  unitPayload,
  propertyPayload,
  tenantPayload,
} from "./mapppers/hubspot.mapping.js";
// import {} from "";

export {
  getPropertiesHS,
  getUnitsHS,
  getTenantsHS,
  syncHSPropertyToMRI,
  syncHSTenantsToMRI,
  syncHSUnitsToMRI,
  mri_unit_payload,
  mri_tenant_payload,
  mri_property_payload,
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
