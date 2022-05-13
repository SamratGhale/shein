/**
 * Class for the application.
 */
 const Secure = require('./helpers/secure')

 class App {
    /**
     * Constructor of the class
     */

    constructor() {
      this.permissions = {};
      this.apiPath = '/api/v1';
    }
  
    connectServer(server) {
      // server.ext('onRequest', async (request, h) => h.continue);
      this.server = server;
    }
  
    /**
     * Default hapi handler.
     * @param {object} request Request instance
     * @param {object} h Response instance
     */
    defaultHandle(request, h) {
      return h
        .response({
          statusCode: 401,
          error: 'Not Implemented',
          message: 'This feature has not been implemented.',
        })
        .code(501);
    }
  
    /**
     * Handlers for an operation.
     * @param {object} operation Operation instance.
     * @param {object} request Request instance.
     * @param {object} h Response instance.
     */
    async handle(permissions = [],controller, request, h) {
      const fn = controller || this.defaultHandle;
      try {
        if (permissions.length > 0) {
          const isAllowed = await Secure(permissions, request);
          if (!isAllowed) {
            return h
              .response({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'You are not authorized to do this operation.',
              })
              .code(401);
          }
        }
  
        const result = await fn(request, h);
  
        if (result instanceof Error) {
          return h
            .response({
              statusCode: result.code || 500,
              error: 'Server Error',
              message: result.message,
            })
            .code(result.code || 500);
        }
  
        return result;
        // return this.database.processResponse(result);
      } catch (error) {
          return h
            .response({ statusCode: error.code, error: 'Server Error', message: error.message })
            .code(500);
      }
    }

    register({ name, routes, validators, controllers }) {
      const approutes = [];
      const operationNames = Object.keys(routes);

      this.permissions[name] = {}

      operationNames.forEach((operationName) => {
        let route = routes[operationName];
        this.permissions[name][operationName] = route.permissions || [];
        const c={
          method: route.method,
          path: `${this.apiPath}/${name}${route.path}`,
          config:{
            description: route.description,
            tags: ['api',name],
            validate: validators[operationName] ? validators[operationName] :{},
            handler: this.handle.bind(this, this.permissions[name][operationName], controllers[operationName])
          }
        }
        if(route.uploadPayload){
          c.config.payload = Object.assign({}, route.uploadPayload);
        }
        c.config.plugins = {
          'hapi-swagger': {
            payloadType: 'form',
            consumes: ['multipart/form-data'],
          },
        };
        approutes.push(c)
      });
      this.server.route(approutes);
    }
  
  }
  
  const instance = new App();
  
  module.exports = instance;