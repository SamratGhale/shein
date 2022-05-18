const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  customer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  location: { type: String, description: "Order location" },
  status: { type: String, default: "ordered", description: "Status of the order", required: true },
  paymentType: { type: String, default: "hand_cash", description: "Payment type" },
  dueDate: { type: Date, description: "Order due date" },
  charge: { type: Number, default: 100, description: "Delivery charge" },
  ...commonSchema,
}

const OrderSchema = mongoose.Schema(schema, {
  collection: 'Order',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Order', OrderSchema);
