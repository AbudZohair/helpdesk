const Ticket = require("../../app/models/Ticket");
const { isAccessGranted } = require("../auth");
const { default: AdminBro, NotFoundError, populator } = require("adminjs");
const resourceName = "Ticket";

const properties = {
  body: {
    type: "textarea",
  },
  createdAt: {
    isVisible: false,
  },

  updatedAt: {
    isVisible: {
      edit: false,
      list: true,
      show: true,
      filter: true,
    },
  },
  customer: {
    isVisible: {
      edit: false,
      new: false,
      list: true,
      show: true,
      filter: true,
      deletE: true,
    },
  },
  status: {
    isVisible: {
      list: true,
      edit: true,
      show: true,
    },
    isEditable: false,
  },

  updatedBy: {
    isVisible: false,
  },
};

const actions = {
  addReply: {
    actionType: "record",
    icon: "Add",
    isVisible: true,
    component: AdminBro.bundle("../components/show/Show.jsx"),
    handler: async (request, response, context) => {
      const { record, resource, currentAdmin, h, translateMessage } = context;
      if (!record) {
        throw new NotFoundError(
          [
            `Record of given id ("${request.params.recordId}") could not be found`,
          ].join("\n"),
          "Action#handler"
        );
      }
      if (request.method === "get") {
        return { record: record.toJSON(currentAdmin) };
      }

      const newRecord = await record.update(request.payload);
      const [populatedRecord] = await populator([newRecord]);

      context.record = populatedRecord;

      if (record.isValid()) {
        return {
          redirectUrl: h.resourceUrl({
            resourceId: resource._decorated?.id() || resource.id(),
          }),
          notice: {
            message: translateMessage("successfullyUpdated", resource.id()),
            type: "success",
          },
          record: populatedRecord.toJSON(currentAdmin),
        };
      }
      return {
        record: populatedRecord.toJSON(currentAdmin),
        notice: {
          message: translateMessage("thereWereValidationErrors"),
          type: "error",
        },
      };
    },
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "addReply",
    }),
  },
  search: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "search",
    }),
  },
  show: {
    showInDrawer: true,
    component: AdminBro.bundle("../components/show/Show.jsx"),

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

    before: async (request, context) => {
      const { currentAdmin } = context;
      if (currentAdmin.role.name !== "customer") return request;
      return {
        ...request,
        query: { ...request.query, "filters.customer": currentAdmin._id },
      };
    },
  },
  new: {
    component: AdminBro.bundle("../components/newTicket/index.jsx"),
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "new",
    }),
    before: (req, { currentAdmin }) => {
      req.payload = {
        ...req.payload,
        customer: currentAdmin._id,
      };
      return req;
    },
  },
  edit: {
    isAccessible: isAccessGranted({
      resourceName: resourceName,
      actionRequested: "edit",
    }),
    before: (req, { currentAdmin }) => {
      req.payload = {
        ...req.payload,
        updatedBy: currentAdmin._id,
      };
      return req;
    },
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
  resource: Ticket,
  options: {
    properties,
    actions,
    sort: {
      sortBy: "updatedAt",
      direction: "desc",
    },
    navigation: {
      icon: "Ticket",
      name: "Tickets Management",
    },
  },
  features,
};
