import { logger } from "../index.js";

function ownerProperties() {
  return [
    "owner_address1",
    "owner_address2",
    "owner_address3",
    "owner_address6",
    "owner_address5",
    "hs_merged_object_ids",
    "owner_name",
    "hubspot_owner_id",
    "hubspot_owner_assigneddate",
    "hubspot_team_id",
    "owner_postcode",
    "owner_reference",
    "hs_shared_team_ids",
    "hs_shared_team_ids",
    "owner_address4",
    "owner_type",
  ];
}
function propertyProperties() {
  /**property_address1,property_address2,property_address3,property_address6,property_address5,name,,property_postcode,,,hs_shared_team_ids,address4,age,property,property_manager,property_notestotal_units,water_supplier,water_type,weater_meter_point, */
  return [
    "property_address1",
    "property_address2",
    "property_address3",
    "property_address6",
    "property_address5",
    "property_postcode",
    "property_address4",
    "water_type",
    "age",
    "property",
    "property_manager",
    "property_notestotal_units",
    "water_supplier",
    "weater_meter_point",
  ];
}
function propertyPayload(property = {}) {
  return {
    property_address1: property.address1,
    property_address2: property.address2,
    property_address3: property.address3,
    property_address6: property.address6,
    property_address5: property.address5,
    property_address4: property.address4,
    property_postcode: property.postcode,
    // water_type :property.address2,
    // age,
    property: property.description,
    // property_manager: property.id,
    // property_notestotal_units: property.reference,
    // water_supplier,
    // weater_meter_point,
  };
}
function unitProperties() {
  return [
    "furnishing",
    "unit",

    "property_address1",
    "property_address2",
    "property_address3",
    "property_address6",
    "property_address5",
    "property_postcode",
    "property_address4",
    "water_type",
    "age",
    "property",
    "property_manager",
    "property_notestotal_units",
    "water_supplier",
    "weater_meter_point",
  ];
}

function unitPayload(owner = {}) {
  return {
    owner_name: owner.name,
    owner_address1: owner.owner_address1,
    owner_address2: owner.owner_address2,
    owner_address3: owner.owner_address3,
    owner_address4: owner.owner_address4,
    owner_address5: owner.owner_address5,
    owner_address6: owner.owner_address6,
    owner_postcode: owner.owner_postcode,
    // sourceid: owner.id,
    owner_reference: owner.reference,
  };
}
function tenantProperties() {
  return [
    // "property_address1",
    // "property_address2",
    // "property_address3",
    // "property_address6",
    // "property_address5",
    // "property_postcode",
    // "property_address4",
    // "water_type",
    // "age",
    // "property",
    // "property_manager",
    // "property_notestotal_units",
    // "water_supplier",
    // "weater_meter_point",
    "tenancy",
  ];
}
function tenantPayload(tenant = {}) {
  return {
    tenancy: tenant.name,
  };
}

function ownerPayload(owner = {}) {
  return {
    owner_name: owner.name,
    owner_address1: owner.owner_address1,
    owner_address2: owner.owner_address2,
    owner_address3: owner.owner_address3,
    owner_address4: owner.owner_address4,
    owner_address5: owner.owner_address5,
    owner_address6: owner.owner_address6,
    owner_postcode: owner.owner_postcode,
    // sourceid: owner.id,
    owner_reference: owner.reference,
  };
}

export {
  ownerProperties,
  ownerPayload,
  unitPayload,
  propertyPayload,
  tenantPayload,
  unitProperties,
  tenantProperties,
  propertyProperties,
};
