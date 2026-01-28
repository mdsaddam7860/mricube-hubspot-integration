import {
  logger,
  fetchUnits,
  creatUnit,
  updateUnit,
  unitPayload,
  getUnitsHS,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

async function syncUnitsToHubspot() {
  try {
    const units = await fetchUnits();
    logger.info(`Syncing ${units.length} units to HubSpot`);

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

        let upsert = "46500353134";
        if (upsert) {
          //➡️ Update unit
          upsert = await hubspotExecutor(
            () => updateUnit("46500353134", payload),
            { name: "Update Unit in Hubspot" }
          );
          logger.info(`Unit UPDATED: ${JSON.stringify(upsert, null, 2)}`);
        } else {
          //➡️ Create unit
          upsert = await hubspotExecutor(() => creatUnit(payload), {
            name: "Create Unit in Hubspot",
          });
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

async function syncHSUnitsToMRI() {
  try {
    /**TODO - Get Tenants from HUbspot and upsert it into MRI Cube */
  } catch (error) {
    logger.error("Error syncing units to MRI Cube:", error);
  }
}

export { syncUnitsToHubspot, syncHSUnitsToMRI };
