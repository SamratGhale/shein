const controllers = require('./orders.controllers')
const validators = require('./order.validators')

const routes = {
  add: {
    method: "POST",
    path: "",
    description: "Place an order",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
  },
  list: {
    method: "GET",
    path: "",
    description: "List all Items",
  },
};

function register(app) {
  app.register({
    name: "Order",
    routes,
    validators,
    controllers
  });
}

module.exports = register;