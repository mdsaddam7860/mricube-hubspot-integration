import { logger, fetchUnits, fetchTenants } from "../index.js";

async function syncTenantsToHubspot() {
  try {
    const tenants = await fetchTenants();
    logger.info(`Syncing ${tenants.length} tenants to HubSpot`);
    logger.info(`Tenant ${JSON.stringify(tenants[0], null, 2)} `);
  } catch (error) {
    logger.error("Error syncing tenants to HubSpot:", error);
  }
}

export { syncTenantsToHubspot };
