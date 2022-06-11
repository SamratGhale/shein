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
    },
    getMyCart: {
        method: "GET",
        path: "",
        description: "Get my cart items"
    },
    update: {
        method: "PUT",
        path: "/{id}",
        description: "update cart",
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