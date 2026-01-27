import { logger, fetchTenants } from "../index.js";

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
      } catch (error) {
        logger.error(
          `Polling syncing tenants ${JSON.stringify(tenant)} to HubSpot:`
        );
      }
    }
  } catch (error) {
    logger.error("Error syncing tenants to HubSpot:", error);
  }
}

export { syncTenantsToHubspot };
