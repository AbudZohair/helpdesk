const Comment = require("../../app/models/Comment.js");
const { isAccessGranted } = require("../auth");

const resourceName = "Comment";

const properties = {
  createdAt: {
    isVisible: {
      edit: false,
      list: true,
      show: true,
      filter: true,
    },
  },
  updatedAt: { isVisible: false },
  author: {
    isVisible: {
      edit: false,
      new: false,
      list: true,
      show: true,
      filter: true,
      deletE: true,
    },
  },
};

const actions = {
  search: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "search",
    }),
  },
  show: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "show",
    }),
  },
  list: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "list",
    }),
  },
  new: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "new",
    }),
    before: (req, { currentAdmin }) => {
      req.payload = {
        ...req.payload,
        author: currentAdmin._id,
      };

      return req;
    },
  },
  edit: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "edit",
    }),
  },
  delete: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "delete",
    }),
  },
  bulkDelete: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "bulkDelete",
    }),
  },
};

const features = [];

module.exports = {
  resource: Comment,
  options: {
    properties,
    actions,
    navigation: false,
  },
  features,
};
