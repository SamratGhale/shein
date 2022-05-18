const Joi = require('joi-oid');

module.exports = {
  findById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
      phone: Joi.number().optional().description('user phone'),
      role: Joi.string().optional().description("user role")
    }),
  },
  auth: {
    params: Joi.object({
      token: Joi.string(),
    }),
  },
  registerEmail: {
    params: Joi.object({
      token: Joi.string(),
    }),
  },
  login: {
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
    }),
  },
  google_login: {
    params: Joi.object({
      cred: Joi.string().description('google crediential'),
    }),
  },

  changePassword: {
    payload: Joi.object({
      oldPassword: Joi.string().description('user email'),
      newPassword: Joi.string().description('user password'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  approve: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
      role: Joi.string().optional().description("user role")
    }),
  },
  findByRoles: {
    params: Joi.object({
      role: Joi.string(),
    }),
  },
};
