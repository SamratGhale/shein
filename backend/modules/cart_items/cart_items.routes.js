const { CART } = require('../../constants/permissions');
const controllers = require('./cart_items.controllers')
const validators = require('./cart_items.validators')

const routes = {
    add: {
        method: "POST",
        path: "",
        description: "Add item to cart",
        uploadPayload: {
            output: "stream",
            parse: true,
            multipart: true,
            allow: "multipart/form-data",
        },
		permissions: [CART.WRITE]
    },
    getMyCart: {
        method: "GET",
        path: "",
        description: "Get my cart items",
		permissions: [CART.READ]
    },
    update: {
        method: "PUT",
        path: "/{id}",
        description: "update cart",
		permissions: [CART.WRITE]
    },
    deleteById: {
        method: "DELETE",
        path: "/{id}",
        description: "Delete cart by item",
		permissions: [CART.WRITE]
    }
};

function register(app) {
    app.register({
        name: "Cart",
        routes,
        validators,
        controllers
    });
}

module.exports = register;
