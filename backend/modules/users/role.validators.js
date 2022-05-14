const Joi = require('joi-oid');

module.exports = {
  register: {
    payload: Joi.object({
      name : Joi.string().optional().description('Role name'),
      permissions: Joi.array().optional().description('Permissions of the role'),
    }),
  },
  removePermissions: {
    payload: Joi.object({
      name : Joi.string().optional().description('Role name'),
      permissions: Joi.array().description('Permissions to remove'),
    }),
  },
  getPermissions: {
    params: Joi.object({
      name : Joi.string().description('Role name'),
    }),
  },
  archive: {
    params: Joi.object({
      name : Joi.string().optional().description('Role name'),
    }),
  },
  isValidRole: {
    params: Joi.object({
      name : Joi.string().optional().description('Role name'),
    }),
  },
  addPermissions: {
    payload: Joi.object({
      name : Joi.string().optional().description('Role name'),
      permissions: Joi.array().description('Permissions to remove'),
    }),
  },
};
