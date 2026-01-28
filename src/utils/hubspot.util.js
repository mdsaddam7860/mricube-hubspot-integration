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

function unitProperties() {
  return [
    "furnishing",
    "unit",
    "single_bedrooms",
    "unit_reference",
    "unit_to_property",
    "unit_type",
    "unit_tenure",
    "unit_status",
    "total_square_metres_sqm",
    "total_square_footage_sqft",
    "total_bedrooms",
    "total_bathrooms",

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
  ];
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
function propertyProperties() {
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
    "property_status",
    "property_tenure",
    "property_type",
    "property_reference",
    "block_manager",
  ];
}

export {
  unitProperties,
  tenantProperties,
  ownerProperties,
  propertyProperties,
};
