import { logger, fetchUnits, fetchProperties, fetchOwners } from "../index.js";

async function syncPropertiesToHubspot() {
  try {
    const proeperties = await fetchProperties();
    logger.info(`Syncing ${proeperties.length} Properties to HubSpot`);
    logger.info(`Unit ${JSON.stringify(proeperties[0], null, 2)} `);

    for (const [index, property] of proeperties.entries()) {
      try {
        /**TODO
         * Validate owner association
         * Upsert property
         * Maintain owner ↔ property relationship
         */
      } catch (error) {
        logger.error(
          `Polling syncing properties ${JSON.stringify(property)} to HubSpot:`
        );
      }
    }
  } catch (error) {
    logger.error("Error syncing proeperties to HubSpot:", error);
  }
}

export { syncPropertiesToHubspot };
