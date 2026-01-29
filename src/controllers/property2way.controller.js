import {
  logger,
  fetchUnits,
  fetchProperties,
  fetchOwners,
  updateProperty,
  createProperty,
  propertyPayload,
  getPropertiesHS,
  createUnittInMRI,
  updateUnittInMRI,
  createPropertytInMRI,
  updatePropertytInMRI,
  createTenantInMRI,
  updateTenantInMRI,
  mri_property_payload,
  getRecordsById,
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
    const properties = await getPropertiesHS();
    logger.info(`Syncing ${properties.length} properties to MRI Cube...`);

    for (const [index, property] of properties.entries()) {
      try {
        //➡️ Create or update property in MRI Cube
        logger.info(
          `Property at index ${index + 1}: ${JSON.stringify(property, null, 2)}`
        );

        // search property in MRI Cube
        const endPoint = "properties";

        let upsertProperty = await mriExecutor(
          () => getRecordsById(endPoint, "1"),
          { name: "Search property in MRI Cube" }
        );

        logger.info(
          `Property FOUND: ${JSON.stringify(upsertProperty, null, 2)}`
        );

        // create payload
        const payload = mri_property_payload(property, "1");
        logger.info(`Property Payload ${JSON.stringify(payload, null, 2)}`);

        // create or update property in MRI Cube

        if (upsertProperty) {
          //➡️ Update Property
          upsertProperty = await mriExecutor(
            () => createPropertytInMRI(payload),
            { name: "Create Property in MRI Cube" }
          );
          logger.info(`Property UPDATED: ${JSON.stringify(upsertProperty)}`);
        } else {
          // ➡️ Create property
          upsertProperty = await mriExecutor(
            () => updatePropertytInMRI(payload),
            { name: "Create Property in MRI Cube" }
          );

          logger.info(`Property CREATED: ${JSON.stringify(upsertProperty)}`);
        }

        return;
      } catch (error) {
        logger.info(
          `Polling syncing properties ${JSON.stringify(property)} to MRI Cube:`,
          error.response?.data || error
        );
        return;
      }
    }
  } catch (error) {
    logger.error("Error syncing proeperties to MRI Cube:", error);
  }
}
export { syncPropertiesToHubspot, syncHSPropertyToMRI };
