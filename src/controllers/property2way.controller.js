import {
  logger,
  fetchUnits,
  fetchProperties,
  fetchOwners,
  updateProperty,
  createProperty,
  propertyPayload,
  getPropertiesHS,
} from "../index.js";
import { mriExecutor, hubspotExecutor } from "../utils/executors.js";

async function syncPropertiesToHubspot() {
  try {
    const proeperties = await fetchProperties();
    logger.info(`Syncing ${proeperties.length} Properties to HubSpot...`);

    for (const [index, property] of proeperties.entries()) {
      try {
        /**TODO
         * Validate owner association
         * Upsert property
         * Maintain owner ↔ property relationship
         */

        logger.info(
          `Property at index ${index + 1}: ${JSON.stringify(property, null, 2)}`
        );

        // Create payload for updating/creating property in hubspot
        const payload = propertyPayload(property);
        logger.info(`Property Payload ${JSON.stringify(payload, null, 2)}`);

        //➡️ find property in hubspot
        let upsertProperty = null;

        if (upsertProperty) {
          //➡️ Update Property
          upsertProperty = await hubspotExecutor(
            () => updateProperty("46529526090", payload),
            { name: "Update Property in Hubspot" }
          );
          logger.info(
            `Property UPDATED: ${JSON.stringify(upsertProperty, null, 2)}`
          );
        } else {
          //➡️ Create property
          upsertProperty = await hubspotExecutor(
            () => createProperty(payload),
            { name: "Create Property in Hubspot" }
          );
          logger.info(
            `Property CREATED: ${JSON.stringify(upsertProperty, null, 2)}`
          );
        }

        //➡️ Associate with owner in hubsopt (propertyId,find ownerId in hubspot)

        return;
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

async function syncHSPropertyToMRI() {
  try {
    // get property from hubspot and upsert it into MRI Cube
  } catch (error) {
    logger.error("Error syncing proeperties to MRI Cube:", error);
  }
}
export { syncPropertiesToHubspot, syncHSPropertyToMRI };
