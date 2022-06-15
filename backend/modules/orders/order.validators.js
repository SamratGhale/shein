const Joi = require("joi-oid");
const { PAYMENT_METHODS, PLACEMENT, ORDER_STATUS } = require("../../constants/order");


module.exports = {
  add: {
    payload: Joi.object({
      user_email: Joi.string().email().optional(),
      payment_method: Joi.string().valid(...Object.values(PAYMENT_METHODS)),
      order_status: Joi.string().valid(...Object.values(ORDER_STATUS)).optional(),
      delivery_type: Joi.string().valid(...Object.values(PLACEMENT)),
      delivery_duedate: Joi.date().optional(),
      location: Joi.string().description("Location of delivery address"),
      lat_long: Joi.array().items(Joi.string()).length(2).description("Latitude and longitude of the delivery location").optional(),
      items: Joi.array().single().description("Array of items to be added in the order")
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.objectId().description("order id")
    })
  },
  update: {
    params: Joi.object({
      id: Joi.objectId().description("order id")
    }),
    payload: Joi.object({
      user_email: Joi.string().email().optional(),
      payment_method: Joi.string().valid(...Object.values(PAYMENT_METHODS)).optional(),
      discount: Joi.number().optional(),
      delivery_charge: Joi.number().optional(),
      status: Joi.string().valid(...Object.values(ORDER_STATUS)).optional(),
      delivery_type: Joi.string().valid(...Object.values(PLACEMENT)).optional(),
      delivery_duedate: Joi.date().optional(),
      location: Joi.string().description("Location of delivery address").optional(),
      lat_long: Joi.array().items(Joi.string()).length(2).description("Latitude and longitude of the delivery location").optional(),
      items: Joi.array().single().description("Array of items to be added in the order").optional()
    }),
  },
}