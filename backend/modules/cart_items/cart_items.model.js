const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  item_id: { type: mongoose.Schema.ObjectId, ref: 'Clothes', required: true },
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  is_selected: {
    type: Boolean, default: false, require: true,
  },
  quantity: { type: Number, required: true },
  ...commonSchema,
};

const CartItemsSchema = mongoose.Schema(schema, {
  collection: 'CartItems',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('CartItems', CartItemsSchema);