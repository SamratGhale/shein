const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  order_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order', required: true
  },
  item_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'clothes', 
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    description: "Quantity of items",
    required: true
  },
  ...commonSchema,
};

const OrderItemsSchema = mongoose.Schema(schema, {
  collection: "OrderItems",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


module.exports = mongoose.model("OrderItems", OrderItemsSchema);