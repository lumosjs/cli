/**
 * Creates a group of routes with middleware and optional rate limiting.
 * @param {function} middleware - The middleware function to apply to the routes.
 * @param {object} app - The application object to define routes.
 * @param {function} rateLimit - Optional rate limiting middleware.
 * @returns {object} - The custom group object containing route methods.
 */

export function group(middleware, app, rateLimit) {

  /**
   * Applies a route registration method with or without rate limiting.
   * @param {string} method - The HTTP method to use for route registration.
   * @param {string} path - The URL path for the route.
   * @param {function} handle - The route handling function.
   */

  function applyMethod(method, path, handle) {
    if (rateLimit === undefined) {
      app[method](path, middleware, handle); // Register route without rate limiting
    } else {
      app[method](path, middleware, rateLimit, handle); // Register route with rate limiting
    }
  }

  // Custom group object for defining route methods
  const customGroup = {

    /**
     * Registers a route with middleware and optional rate limiting.
     * @param {string} path - The URL path for the route.
     * @param {function} handle - The route handling function.
     * @returns {object} - The custom group object for chaining methods.
     */

    web: (path, handle) => {
      applyMethod('web', path, handle);
      return customGroup;
    },
    post: (path, handle) => {
      applyMethod('post', path, handle);
      return customGroup;
    },
    get: (path, handle) => {
      applyMethod('get', path, handle);
      return customGroup;
    },
    put: (path, handle) => {
      applyMethod('put', path, handle);
      return customGroup;
    },
    delete: (path, handle) => {
      applyMethod('delete', path, handle);
      return customGroup;
    },
  };

  return customGroup;
}