function propertyPayload(property = {}) {
  return {
    property_address1: property.address1,
    property_address2: property.address2,
    property_address3: property.address3,
    property_address4: property.address4,
    property_address5: property.address5,
    property_address6: property.address6,
    property_postcode: property.postcode,
    // water_type :property.address2,
    // age,
    property: property.description,
    property_manager: property.id,
    // property_notestotal_units: property.reference,
    // water_supplier,
    // weater_meter_point,
    property_status: property.status,
    property_tenure: property.tenure,
    property_type: property.type,
    property_reference: property.reference,
    // block_manager: property.block_manager,
  };
}

function unitPayload(unit = {}) {
  return {
    // furnishing: unit.description,
    unit: unit.description,
    unit_tenure: unit.tenure,
    unit_type: unit.type,
    unit_status: unit.status,
    unit_reference: unit.reference,
  };
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

export { ownerPayload, unitPayload, propertyPayload, tenantPayload };
