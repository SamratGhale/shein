const Joi = require('joi');
const joi = require('joi-oid');

module.exports = {
    add: {
        payload: Joi.object({
            item_id: Joi.object(),
            quantity: Joi.number()
        })
    },
}