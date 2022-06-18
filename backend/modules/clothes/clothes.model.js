const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  item_name: {
    type: String,
    required: true,
    trim: true,
    description: "Item's name",
  },
  item_price: { 
    type: Number, 
    description: "Item's price", 
    required: true 
  },
  item_code: {
     type: String, 
     description: "Item's code", 
     unique: true 
    },
  discount: {
    type: Number,
    description: "Item's discount approved",
    default: 0,
  },
  quantity: {
    type: Number,
    description: "Amount of quantity",
    default: 1,
  },
  description: {
    type: String,
    description: "description of item",
  },
  tags: {
    type: Array,
    description: "Tags (for searching)",
  },
  tax: {
    type: Number,
    description: "tax amount",
    required: false,
  },
  ...commonSchema,
};

const ClothesSchema = mongoose.Schema(schema, {
  collection: "clothes",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

ClothesSchema.index({ item_code: 1 }, { unique: true });

module.exports = mongoose.model("Clothes", ClothesSchema);