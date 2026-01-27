import { logger, fetchUnits } from "../index.js";

async function syncUnitsToHubspot() {
  try {
    const units = await fetchUnits();
    logger.info(`Syncing ${units.length} units to HubSpot`);
    logger.info(`Unit ${JSON.stringify(units[0], null, 2)} `);
  } catch (error) {
    logger.error("Error syncing units to HubSpot:", error);
  }
}

export { syncUnitsToHubspot };
