const routes = [];

/**
 * Adds a new route to the routes array.
 * @param {string} method - HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {string} path - Path of the route.
 * @param {...function} handlers - Middleware handlers for the route.
 */
function addRoute(method, path, ...handlers) {
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path: ${path}. Paths must start with a slash.`);
  }

  const paramNames = [];
  const regexPath = new RegExp(`^${path.replace(/:[\w-]+/g, match => {
    const paramName = match.substring(1);
    paramNames.push(paramName);
    return "([^/]+)";
  })}$`);

  routes.push({ method, regexPath, paramNames, handlers });
}

/**
 * Adds a new GET route.
 * @param {string} path - Path of the route.
 * @param {...function} handlers - Middleware handlers for the route.
 */
function get(path, ...handlers) {
  addRoute("GET", `/api${path}`, ...handlers);
}

/**
 * Adds a new POST route.
 * @param {string} path - Path of the route.
 * @param {...function} handlers - Middleware handlers for the route.
 */
function post(path, ...handlers) {
  addRoute("POST", `/api${path}`, ...handlers);
}

/**
 * Adds a new PUT route.
 * @param {string} path - Path of the route.
 * @param {...function} handlers - Middleware handlers for the route.
 */
function put(path, ...handlers) {
  addRoute("PUT", `/api${path}`, ...handlers);
}

/**
 * Adds a new DELETE route.
 * @param {string} path - Path of the route.
 * @param {...function} handlers - Middleware handlers for the route.
 */
function delet(path, ...handlers) {
  addRoute("DELETE", `/api${path}`, ...handlers);
}

export { routes, get, post, put, delet };