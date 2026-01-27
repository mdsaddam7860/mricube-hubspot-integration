import { logger, fetchOwners, upsertOwner, ownerPayload } from "../index.js";

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

        const upsert = await upsertOwner(payload);

        logger.info(`Owner UPSERT ${JSON.stringify(upsert, null, 2)}`);
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
