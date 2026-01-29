import {
  logger,
  fetchTenants,
  creatTenant,
  updateTenant,
  tenantPayload,
  getTenantsHS,
  createUnittInMRI,
  updateUnittInMRI,
  createPropertytInMRI,
  updatePropertytInMRI,
  createTenantInMRI,
  updateTenantInMRI,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

async function syncTenantsToHubspot() {
  try {
    const tenants = await fetchTenants();
    logger.info(`Syncing ${tenants.length} tenants to HubSpot`);

    for (const [index, tenant] of tenants.entries()) {
      try {
        /**TODO
         * Validate unit association
         * Upsert tenant
         * Maintain unit ↔ tenant relationship
         */
        //➡️ create payload for creating/updating tenant in hubspot
        const payload = tenantPayload(tenant);

        let upsertTenant = "46543924391";
        if (upsertTenant) {
          //➡️ Update tenant
          upsertTenant = await hubspotExecutor(
            () => updateTenant("46543924391", payload),
            { name: "Update Tenant in Hubspot" }
          );
          logger.info(
            `Tenant UPDATED: ${JSON.stringify(upsertTenant, null, 2)}`
          );
        } else {
          //➡️ Create tenant
          upsertTenant = await hubspotExecutor(() => creatTenant(payload), {
            name: "Create Tenant in Hubspot",
          });
          logger.info(
            `Tenant CREATED: ${JSON.stringify(upsertTenant, null, 2)}`
          );
        }
        //➡️ Maintain unit ↔ tenant relationship
        return;
      } catch (error) {
        logger.error(
          `Polling syncing tenants ${JSON.stringify(tenant)} to HubSpot:`,
          error.response?.data || error
        );
      }
    }
  } catch (error) {
    logger.error("Error syncing tenants to HubSpot:", error);
  }
}

async function syncHSTenantsToMRI() {
  try {
    /**TODO - Get Tenants from HUbspot and upsert it into MRI Cube */
  } catch (error) {
    logger.error("Error syncing Tenants to MRI Cube:", error);
  }
}

export { syncTenantsToHubspot, syncHSTenantsToMRI };
