const Joi = require('joi');
const joi = require('joi-oid');

module.exports = {
    add: {
        payload: Joi.object({
            item_id: joi.objectId().description("Items' id"),
            quantity: Joi.number().description("Quantity of items to add"),
            is_selected: Joi.boolean().description("\n\
* Get's set to zero every cart's page(only) reload.\n\
* This is meant to solve the problem when you increase the amount after selecting the items for checkout.\n\
* To create same storage for selected items and cart items and to make increasing amount after selecting.\n\
            ").optional()
        })
    },
    update: {
        params:Joi.object({
            id: joi.objectId().description("Cart's id")
        }),
        payload: Joi.object({
            item_id: joi.objectId().description("Items' id"),
            quantity: Joi.number().description("Quantity of items to add"),
            is_selected: Joi.boolean().description("\n\
* Get's set to zero every cart's page(only) reload.\n\
* This is meant to solve the problem when you increase the amount after selecting the items for checkout.\n\
* To create same storage for selected items and cart items and to make increasing amount after selecting.\n\
            ").optional()
        })
    },
}