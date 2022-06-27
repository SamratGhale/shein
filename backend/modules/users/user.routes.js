const { USER } = require('../../constants/permissions');
const controllers = require('./user.controllers');
const validators = require('./user.validators');

const routes = {
  list: {
    method: 'GET',
    path: '',
    description: 'List all users',
    permissions: [USER.ADMIN]
  },
  register: {
    method: 'POST',
    path: '/register',
    description: 'Add user',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  changePassword: {
    method: 'PUT',
    path: '/changepassword/{token}',
    description: 'Change User password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  archive: {
    method: 'DELETE',
    path: '/{id}',
    description: 'Archive user',
    permissions: [USER.WRITE, USER.ADMIN]
  },
  approve: {
    method: 'PUT',
    path: '/{id}',
    description: 'approve user',
    permissions: [USER.ADMIN]
  },
  update: {
    method: 'POST',
    path: '/{id}/update',
    description: 'Update user',
    permissions: [USER.WRITE, USER.ADMIN]
  },
  getById: {
    method: 'GET',
    path: '/{id}',
    description: 'Get user by id',
    permissions: [USER.READ, USER.ADMIN]
  },
  findByRoles: {
    method: 'GET',
    path: '/role/{role}',
    description: 'Get users by role',
    permissions: [USER.READ, USER.ADMIN]
  },
  login: {
    method: 'POST',
    path: '/login',
    description: 'Login using username and password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  google_login: {
    method: 'POST',
    path: '/google_login/{cred}',
    description: 'Login using google',
  },
  registerEmail: {
    method: 'POST',
    path: '/validate/{token}',
    description: 'Verify email of a user',
  },
};

function register(app) {
  app.register({
    name: 'user',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;