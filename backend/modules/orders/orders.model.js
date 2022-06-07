const mongoose = require("mongoose");
const { PAYMENT_METHODS, ORDER_STATUS, PLACEMENT } = require("../../constants/order");
const commonSchema = require("../../helpers/schema");

const schema = {
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', required: true
  },
  payment_method: {
    type: String,
    enum: PAYMENT_METHODS,
    default: PAYMENT_METHODS.CASH,
    description: "Item's price",
    required: false
  },
  status: {
    type: String,
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PLACED,
    description: "Status of the order",
    required: true
  },
  delivery_type:{
    type: String,
    enum: PLACEMENT,
    default: PLACEMENT.DELIVERY,
    description: "Delivery type",
    required: true
  },
  discount: {
    type: Number,
    description: "Orders's discount approved",
    default: 0,
  },
  location: {
    type: String,
    description: "Order location (required of order type is delivery)",
    default: 1,
  },
  lat_long:{
    type: Array,
    description: "Latitude and longitude of delevery location",
    requred: false,
  },
  delivery_charge: {
    type: Number,
    description: "Delivery Charge",
    default: 0,
    required: false
  },
  delivery_duedate: {
    type: Date,
    description: "Delivery Due date",
    required: true
  },
  ...commonSchema,
};

const OrdersSchema = mongoose.Schema(schema, {
  collection: "Orders",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


module.exports = mongoose.model("Orders", OrdersSchema);