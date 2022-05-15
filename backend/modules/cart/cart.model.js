const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  item: { type: mongoose.Schema.ObjectId, ref: 'clothes', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  ...commonSchema,
};

const CartSchema = mongoose.Schema(schema, {
  collection: 'Cart',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Cart', CartSchema);