import {
  logger,
  fetchUnits,
  creatUnit,
  updateUnit,
  unitPayload,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

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

        logger.info(
          `Unit at index ${index + 1}: ${JSON.stringify(unit, null, 2)}`
        );

        //➡️ create payload for creating/updating unit in hubspot
        const payload = unitPayload(unit);

        let upsert = null;
        if (upsert) {
          //➡️ Update unit
          upsert = await updateUnit("45613011028", payload);
          logger.info(`Unit UPDATED: ${JSON.stringify(upsert, null, 2)}`);
        } else {
          //➡️ Create unit
          upsert = await creatUnit(payload);
          logger.info(`Unit CREATED: ${JSON.stringify(upsert, null, 2)}`);
        }

        //➡️ Maintain property ↔ unit relationship
        return;
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
