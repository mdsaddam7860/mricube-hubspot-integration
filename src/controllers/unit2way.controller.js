import { logger, fetchUnits } from "../index.js";

async function syncUnitsToHubspot() {
  try {
    const units = await fetchUnits();
    logger.info(`Syncing ${units.length} units to HubSpot`);
    logger.info(`Unit ${JSON.stringify(units[0], null, 2)} `);

    for (const [index, unit] of units.entries()) {
      try {
        /* TODO
         * Validate property association
         * Upsert unit
         * Maintain property ↔ unit relationship
         */
      } catch (error) {
        logger.error(
          `Polling syncing units ${JSON.stringify(unit)} to HubSpot:`,
          error
        );
      }
    }
  } catch (error) {
    logger.error("Error syncing units to HubSpot:", error);
  }
}

export { syncUnitsToHubspot };
