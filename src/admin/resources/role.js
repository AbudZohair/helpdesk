const { isAccessGranted } = require("../auth");

const Role = require("../../app/models/Role");

const resourceName = "Role";

const properties = {
  name: {
    isId: true,
  },
};
const actions = {
  search: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "search" }),
  },
  show: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "show" }),
  },
  list: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "list" }),
  },
  new: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "new" }),
  },
  edit: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "edit" }),
  },
  delete: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "delete" }),
  },
  bulkDelete: {
    isAccessible: isAccessGranted({
      resourceName,
      actionRequested: "bulkDelete",
    }),
  },
};
const features = [];

module.exports = {
  resource: Role,
  options: {
    properties,
    actions,
    navigation: {
      name: "Roles Management",
    },
  },
  features,
};
