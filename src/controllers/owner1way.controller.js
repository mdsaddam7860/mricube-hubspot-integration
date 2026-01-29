import {
  logger,
  fetchOwners,
  upsertOwner,
  ownerPayload,
  updateOwner,
  createOwner,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

async function syncOwnersToHubspot() {
  try {
    const owners = await fetchOwners();
    logger.info(`Syncing ${owners.length} owners to HubSpot......`);

    for (const [index, owner] of owners.entries()) {
      try {
        // TODO Create or update owner in HubSpot
        logger.info(`Owners ${JSON.stringify(owner, null, 2)} `);

        const payload = ownerPayload(owner);

        logger.info(`Owner Payload ${JSON.stringify(payload, null, 2)}`);
        //➡️ Upsert Owner
        let upsert = null;

        if (upsert) {
          //➡️ Update owner
          upsert = await hubspotExecutor(
            () => updateOwner("45613011028", payload),
            { name: "Update Owner in Hubsot" }
          );
          logger.info(`Owner UPDATE ${JSON.stringify(upsert, null, 2)}`);
        } else {
          //➡️ Create Owner
          upsert = await hubspotExecutor(() => createOwner(payload), {
            name: "Create Owner in Hubspot",
          });
          logger.info(`Owner CREATED: ${JSON.stringify(upsert, null, 2)}`);
        }

        //➡️ Maintain owner ↔ property relationship
        //➡️Associate owner with property

        return; // TODO Remove after testing
      } catch (error) {
        logger.error(
          `Polling syncing owners ${JSON.stringify(owner)} to HubSpot:`,
          error
        );
      }
    }
  } catch (error) {
    logger.error("Error syncing owners to HubSpot:", error);
  }
}

export { syncOwnersToHubspot };
