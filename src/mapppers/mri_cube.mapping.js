function mri_unit_payload(unit = {}) {
  return {
    unit: {
      parentPropertyId: 1,
      reference: unit.unit_reference,
      status: unit.unit_status,
      tenure: unit.unit.tenure,
      type: unit.unit_type,
      description: unit.unit,
    },
  };
}
function mri_tenant_payload(tenant = {}) {
  return {
    tenant: {
      // parentOwnerId: 0,
      // parentUnitId: 0,
      // parentTenantId: 0,
      // reference: "string",
      name: tenant.tenancy,
      // type: "string",
      // status: "string",
      // landlordAndTenantActApplies: "string",
      // landlordAndTenantActType: "string",
      // currency: "string",
      // paymentMethod: "string",
      // omitFromServiceCharge: true,
      // commenced: "2026-01-28T08:47:49.697Z",
      // terminates: "2026-01-28T08:47:49.697Z",
      // dear: "string",
      // yours: "string",
      // correspondenceMethod: "string",
      // smsCorrespondenceMethod: "string",
      // useEmailOneForCorrespondence: true,
      // useEmailTwoForCorrespondence: true,
      // useEmailThreeForCorrespondence: true,
      // address1: "string",
      // address2: "string",
      // address3: "string",
      // address4: "string",
      // address5: "string",
      // address6: "string",
      // postcode: "string",
      // email1: "string",
      // email2: "string",
      // email3: "string",
      // telephone1: "string",
      // telephone2: "string",
      // telephone3: "string",
      // telephone4: "string",
      // extraInformation1: "string",
      // extraInformation2: "string",
      // extraInformation3: "string",
      // extraInformation4: "string",
      // extraInformation5: "string",
      // extraInformation6: "string",
      // extraDetails1: "string",
      // extraDetails2: "string",
    },
  };
}
function mri_property_payload(property = {}) {
  return {
    property: {
      // parentPropertyId: 0,

      // parentOwnerId: 0,
      reference: property.property_reference,
      description: property.property,
      status: property.property_status,
      tenure: property.property_tenure,
      type: property.property_type,
      address1: property.property_address1,
      address2: property.property_address2,
      address3: property.property_address3,
      address4: property.property_address4,
      address5: property.property_address5,
      address6: property.property_address6,
      postcode: property.property_postcode,
    },
  };
}

export { mri_unit_payload, mri_tenant_payload, mri_property_payload };
