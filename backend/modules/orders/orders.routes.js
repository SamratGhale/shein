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
  update: {
    method: "PUT",
    path: "/{id}",
    description: "update an order",
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get order by id",
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