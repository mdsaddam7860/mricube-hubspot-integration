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

function ownerPayload(owner = {}) {
  return {
    owner_name: owner.name,
    address1: owner.owner_address1,
    address2: owner.owner_address2,
    address3: owner.owner_address3,
    address4: owner.owner_address4,
    address5: owner.owner_address5,
    address6: owner.owner_address6,
    postcode: owner.owner_postcode,
    sourceid: owner.id,
    owner_reference: owner.reference,
  };
}

export { ownerProperties, ownerPayload };
