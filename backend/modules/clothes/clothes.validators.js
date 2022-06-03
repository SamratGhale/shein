const Joi = require("joi-oid");

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      item_name: Joi.string().description("Item's Name"),
      item_price: Joi.number().description("Item's price"),
      item_code: Joi.string().description("Itemss code"),
      discount: Joi.number().description("discount percent"),
      quantity: Joi.number().description("quantity of items"),
      description: Joi.string().description("Item's description"),
      tags: Joi.array().items(Joi.string()).single().description("Item's tags"),
      vat: Joi.number().optional().description("Vat amount"),
      images: Joi.array().items(Joi.any().meta({ swaggerType: 'file' })).single().description('Cloth images'),
    }),
  },
  update: {
    payload: Joi.object({
      item_name: Joi.string().description("Item's Name"),
      item_price: Joi.number().description("Item's price"),
      item_code: Joi.string().description("Itemss code"),
      discount: Joi.number().description("discount percent"),
      quantity: Joi.number().description("quantity of items"),
      description: Joi.string().description("Item's description"),
      tags: Joi.array().items(Joi.string()).single().description("Item's tags"),
      vat: Joi.number().optional().description("Vat amount"),
      images: Joi.array().items(Joi.any().meta({ swaggerType: 'file' })).single().description('Cloth Images'),
    }),
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  decreaseItem: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      qty: Joi.number(),
    }),
  },
  increaseItem: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      qty: Joi.number(),
    }),
  },
}