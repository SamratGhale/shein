const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  email: { type: String, joi: Joi.string().email().optional().description("Admin email") },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  role: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  address : { type: String, required: false },
  google_account: { type: Boolean, required: true },
  is_registered: { type: Boolean, required: true, default: false },
  ...commonSchema,
};

const UserSchema = mongoose.Schema(schema, {
  collection: 'User',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);