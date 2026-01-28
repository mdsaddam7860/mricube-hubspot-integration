import {
  logger,
  fetchTenants,
  creatTenant,
  updateTenant,
  tenantPayload,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

async function syncTenantsToHubspot() {
  try {
    const tenants = await fetchTenants();
    logger.info(`Syncing ${tenants.length} tenants to HubSpot`);
    logger.info(`Tenant ${JSON.stringify(tenants[0], null, 2)} `);

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
          upsertTenant = await updateTenant("46543924391", payload);
          logger.info(
            `Tenant UPDATED: ${JSON.stringify(upsertTenant, null, 2)}`
          );
        } else {
          //➡️ Create tenant
          upsertTenant = await creatTenant(payload);
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

export { syncTenantsToHubspot };
