const validators = require('./role.validators');
const controllers = require('./role.controllers');
const { ROLE_ADMIN } = require('../../constants/permissions');

const routes = {
    add: {
        method: 'POST',
        path: '',
        description: 'Add a new role',
        permissions: [ROLE_ADMIN]
    },
    list: {
        method: 'GET',
        path: '',
        description: 'Get all the roles'
    },
    get: {
        method: 'GET',
        path: '/{id}',
        description: 'Get a role by id',
        permission: [ROLE_ADMIN]
    },
    delete: {
        method: 'DELETE',
        path: '/{id}',
        description: 'Delete a role by id',
        permission: [ROLE_ADMIN]
    },
    getPermissions: {
        method: 'GET', 
        path: '/permissions/{name}', 
        description: 'Get permissions list by role'
    },
    addPermissions: {
        method: 'PATCH', 
        path:   '/permissions/{id}', 
        description: 'Add permissions to a role', 
        permission : [ROLE_ADMIN]
    },
    removePermissions: {
        method: 'DELETE', 
        path  : '/permissions/{id}', 
        description: 'Remove permissions from a role', 
        permission: [ROLE_ADMIN]
    },
};

/**
 * Register the routes
 * @param {object} app Application.
 */
function register(app) {
    app.register({
        name: 'roles',
        routes,
        validators,
        controllers,
    });
}

module.exports = register;