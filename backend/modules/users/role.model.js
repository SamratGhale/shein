const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name : {type: String , required: true},
  permissions :{type:Array, required: true},
  ...commonSchema,
};

const RoleSchema = mongoose.Schema(schema, {
  collection: 'Role',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

RoleSchema.index({ unique: true });

module.exports = mongoose.model('Role', RoleSchema);