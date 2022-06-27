const controllers = require('./orders.controllers')
const validators = require('./order.validators');
const { ORDER } = require('../../constants/permissions');

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
		permissions: [ORDER.WRITE]
	},
	update: {
		method: "PUT",
		path: "/{id}",
		description: "update an order",
		permissions: [ORDER.WRITE]
	},
	getById: {
		method: "GET",
		path: "/{id}",
		description: "Get order by id",
		permissions: [ORDER.READ]
	},

	list: {
		method: "GET",
		path: "",
		description: "List all orders",
		permissions: [ORDER.READ]
	},
	getMyOrders: {
		method: "GET",
		path: "/myorders",
		description: "List my orders",
		permissions: [ORDER.READ]
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