const Joi = require('joi');
const joi = require('joi-oid');

module.exports = {
    add: {
        payload: Joi.object({
            item_id: joi.objectId(),
            quantity: Joi.number()
        })
    },
}