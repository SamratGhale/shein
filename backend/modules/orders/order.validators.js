const Joi = require("joi-oid");
const { PAYMENT_METHODS, PLACEMENT } = require("../../constants/order");

let cart_item= Joi.object({
  item_id: Joi.objectId().required(),
  quantity: Joi.number().required()
})

module.exports = {
  add: {
    payload: Joi.object({
      payment_method: Joi.string().valid(...Object.values(PAYMENT_METHODS)),
      delivery_type: Joi.string().valid(...Object.values(PLACEMENT)),
      location: Joi.string().description("Location of delivery address"),
      lat_long: Joi.array().items(Joi.string()).length(2).description("Latitude and longitude of the delivery location"),
      items: Joi.array().single().description("Array of items to be added in the order")
    }),
  },
}