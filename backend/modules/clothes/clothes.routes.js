const { ITEMS } = require("../../constants/permissions");
const controllers = require("./clothes.controllers");
const validators = require("./clothes.validators");

const routes = {
  list: {
    method: "GET",
    path: "",
    description: "List all Items",
  },
  update: {
    method: "PUT",
    path: "/update/{id}",
    description: "Update item",
    uploadPayload: {
      output: "stream",
      maxBytes: 1000 * 1000 * 100,
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
	performance: [ITEMS.WRITE]
  },
  register: {
    method: "POST",
    path: "/register",
    description: "Register new item",
    uploadPayload: {
      output: "stream",
      maxBytes: 1000 * 1000 * 100,
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
	performance: [ITEMS.WRITE]
  },
  archive: {
    method: "DELETE",
    path: "/{id}",
    description: "Archive the item",
	performance: [ITEMS.WRITE]
  },
  decreaseItem: {
    method: "PUT",
    path: "/decrease/{id}",
    description: "decrease item quanity",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
	performance: [ITEMS.WRITE]
  },
  increaseItem: {
    method: "PUT",
    path: "/increase/{id}",
    description: "increase item quanity",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
	performance: [ITEMS.WRITE]
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get item by id",
  },
  getByItemCode: {
    method: "GET",
    path: "/itemcode/{item_code}",
    description: "Get item by item code",
  },
  getAllTags: {
    method: "GET",
    path: "/tags",
    description: "Get all tags",
  },
  getMinMaxPrice: {
    method: "GET",
    path: "/minmax",
    description: "Get maximum and minimun price",
  }
};

function register(app) {
  app.register({
    name: "clothes",
    routes,
    validators,
    controllers,
  });
}

module.exports = register;