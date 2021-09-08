const MongooseAdapter = require("@adminjs/mongoose");
const AdminBro = require("adminjs");

const options = require("./options");

AdminBro.registerAdapter(MongooseAdapter);

module.exports = new AdminBro(options);
