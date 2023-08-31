import { logger } from "#utils/logs";

/**
 * Handles a Bad Request (400) response.
 * @param {http.IncomingMessage} request - The request object.
 * @param {http.ServerResponse} response - The response object.
 */

async function handleBadRequest(request, response) {
  response.send("400 Bad Request");
  response.status(400);
  await logger.error("400 Bad Request");
}

/**
 * Handles a Method Not Allowed (405) response.
 * @param {http.IncomingMessage} request - The request object.
 * @param {http.ServerResponse} response - The response object.
 * @param {string} method - The allowed method for the route.
 */

async function handleMethodNotAllowed(request, response, method) {
  response.status(405);
  response.json({
    msg: `Method Not Allowed. This route supports method ${method}`
  });

  await logger.error(
    `405 Method Not Allowed. This route supports method ${method}`
  );
}

/**
 * Handles a Not Found (404) response.
 * @param {http.IncomingMessage} request - The request object.
 * @param {http.ServerResponse} response - The response object.
 */

async function handleNotFound(request, response) {
  response.json({
    msg: `404 not found`
  });
  response.status(404);
}

// Exporting functions
export { handleNotFound, handleBadRequest, handleMethodNotAllowed };