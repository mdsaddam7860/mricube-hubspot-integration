import { logger, ownerProperties } from "../index.js";
import { getHubspotClient } from "../configs/hubspot.config.js";

async function getOwners() {
  const allOwners = [];
  let after = "";
  try {
    const hubspot = getHubspotClient();
    const owners = hubspot.customObject("2-56396006"); //Initialize Owner
    const properties = ownerProperties();

    do {
      const response = await owners.search({
        filterGroups: [],
        properties,
        limit: 100,
        after,
      });

      const fetchedOwners = response.results;
      //   logger.info(`Fetched ${fetchedOwners.length} owners successfully`);

      allOwners.push(...fetchedOwners);

      after = owners.paging?.next?.after;
    } while (after);

    logger.info(
      `Fetched ${JSON.stringify(allOwners.length)} owners successfully`
    );

    return allOwners;
  } catch (error) {
    logger.error(
      "Error fetching Owners from Hubspot:",
      error.response?.data || error
    );
  }
}

async function getOwnerById() {
  try {
    const hubspot = getHubspotClient();
    const owners = hubspot.customObject("2-56396006");
    const allOwners = [];
    let after = "";

    // const contact = hubspot.contacts.getAllContacts();
    // logger.info(`${JSON.stringify(contact[0], null, 2)}`);

    // logger.info(`${JSON.stringify(owners, null, 2)}`);

    // const owner = await owners.getById("45613011028", ["owner_name"]);
    const properties = ownerProperties();

    do {
      const response = await owners.search({
        filterGroups: [],
        properties,
        limit: 100,
        after,
      });

      const fetchedOwners = response.results;
      logger.info(`Fetched ${fetchedOwners.length} owners successfully`);

      allOwners.push(...fetchedOwners);

      after = owners.paging?.next?.after;
    } while (after);

    logger.info(
      `Fetched ${JSON.stringify(allOwners.length)} owners successfully`
    );

    return allOwners;
  } catch (error) {
    logger.error(
      "Error fetching Owners from Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}

async function getProperties() {
  const allProperty = [];
  let after = "";
  try {
    const hubspot = getHubspotClient();
    const Property = hubspot.customObject("2-52810768"); //Initialize Property
    const properties = ownerProperties();

    do {
      const response = await Property.search({
        filterGroups: [],
        properties,
        limit: 100,
        after,
      });

      const fetchedProperty = response.results;
      //   logger.info(`Fetched ${fetchedProperty.length} Property successfully`);

      allProperty.push(...fetchedProperty);

      after = Property.paging?.next?.after;
    } while (after);

    logger.info(
      `Fetched ${JSON.stringify(allProperty.length)} Property successfully`
    );

    return allProperty;
  } catch (error) {
    logger.error(
      "Error fetching Property from Hubspot:",
      error.response?.data || error
    );
  }
}

async function upsertOwner(payload) {
  try {
    const hubspot = getHubspotClient();
    const owners = hubspot.customObject("2-56396006"); //Initialize Owner
    // const properties = ownerProperties();

    const response = await owners.upsert(
      "owner_name",
      payload.owner_name,
      payload
    );

    logger.info(`Owner UPSERT${JSON.stringify(response, null, 2)}`);

    return response;
  } catch (error) {
    logger.error(
      "Error upsertOwner in Hubspot:",
      error.response?.data || error
    );
  }
}
export { getOwners, getOwnerById, getProperties, upsertOwner };
