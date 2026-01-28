import { logger, ownerProperties } from "../index.js";
import { getHubspotClient } from "../configs/hubspot.config.js";
import { hubspotExecutor } from "../utils/executors.js";

// function getOwnersClient() {
//   const hubspot = getHubspotClient();
//   return hubspot.customObject("2-56396006");
// }
const CUSTOM_OBJECT_IDS = Object.freeze({
  OWNERS: "2-56396006",
  PROPERTIES: "2-52810768",
  UNITS: "2-52810797",
  TENANTS: "2-52810711",
});

function getCustomClientClient(client) {
  const hubspot = getHubspotClient();
  const key = client.toUpperCase();

  const objectId = CUSTOM_OBJECT_IDS[key];
  if (!objectId) {
    throw new Error(`Unknown HubSpot custom object: ${client}`);
  }

  return hubspot.customObject(objectId);
}

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

async function getOwnerById(ownerId) {
  if (!ownerId) {
    logger.warn("Owner id is required");
    return;
  }
  try {
    // const hubspot = getHubspotClient();
    // const owners = hubspot.customObject("2-56396006");
    const allOwners = [];
    let after = "";

    // const contact = hubspot.contacts.getAllContacts();
    // logger.info(`${JSON.stringify(contact[0], null, 2)}`);

    // logger.info(`${JSON.stringify(owners, null, 2)}`);

    const owners = getCustomClientClient("owners");

    const properties = ownerProperties();
    const owner = await owners.getById("45613011028", properties);

    logger.info(`Owner ${JSON.stringify(owner, null, 2)}`);
    return;

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

async function upsertOwner(payload, owner) {
  try {
    // const hubspot = getHubspotClient();
    const owners = getCustomClientClient("owners");
    // const properties = ownerProperties();

    const response = await owners.upsert("owner_name", owner.name, payload);

    logger.info(`Owner UPSERT${JSON.stringify(response, null, 2)}`);

    return response;
  } catch (error) {
    logger.error(
      "Error upsertOwner in Hubspot:",
      error.response?.data || error
    );
  }
}

async function updateProperty(propertyId, payload) {
  if (!propertyId) {
    logger.warn("Property id is required");
    return;
  }
  try {
    // Update Property
    const property = getCustomClientClient("properties");
    const response = await property.update(propertyId, payload);

    return response;
  } catch (error) {
    logger.error(
      "Error updateProperty in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function createProperty(payload = null) {
  if (!payload) {
    logger.warn("Property payload is required");
    return;
  }
  try {
    // Create Property
    const property = getCustomClientClient("properties");
    const response = await property.create(payload);
    // logger.info(`Owner CREATED : ${JSON.stringify(response, null, 2)}`);

    return response;
  } catch (error) {
    logger.error(
      "Error create property in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updateOwner(ownerId, payload) {
  try {
    // Update owner
    const owner = getCustomClientClient("owners");
    const response = await owner.update(ownerId, payload);

    return response;
  } catch (error) {
    logger.error(
      "Error updateOwner in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function createOwner(payload) {
  try {
    // Update owner
    const owner = getCustomClientClient("owners");
    const response = await owner.create(payload);
    // logger.info(`Owner CREATED : ${JSON.stringify(response, null, 2)}`);

    return response;
  } catch (error) {
    logger.error(
      "Error createOwner in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updateTenant(tenantId, payload) {
  if (!tenantId) {
    logger.warn("Tenant id is required");
    return;
  }
  try {
    // Update tenant
    const tenant = getCustomClientClient("tenants");
    const response = await tenant.update(tenantId, payload);

    return response;
  } catch (error) {
    logger.error(
      "Error updatetenant in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function creatTenant(payload = null) {
  if (!payload) {
    logger.warn("Payload id is required");
    return;
  }
  try {
    // Create tenant
    const tenant = getCustomClientClient("tenants");
    const response = await tenant.create(payload);

    return response;
  } catch (error) {
    logger.error(
      "Error createOwner in Hubspot:",
      error.response?.data || error
    );
    throw error;
  }
}
async function updateUnit(unitId, payload) {
  try {
    // Update unit
    const unit = getCustomClientClient("units");
    const response = await unit.update(unitId, payload);

    return response;
  } catch (error) {
    logger.error("Error updateunit in Hubspot:", error.response?.data || error);
    throw error;
  }
}
async function creatUnit(payload) {
  if (!payload) {
    logger.warn("Payload is required");
    return;
  }
  try {
    // Create unit
    const unit = getCustomClientClient("units");
    const response = await unit.create(payload);

    return response;
  } catch (error) {
    logger.error("Error createunit in Hubspot:", error.response?.data || error);
    throw error;
  }
}
export {
  updateProperty,
  createProperty,
  getOwners,
  getOwnerById,
  getProperties,
  upsertOwner,
  updateOwner,
  createOwner,
  creatUnit,
  updateUnit,
  creatTenant,
  updateTenant,
};
