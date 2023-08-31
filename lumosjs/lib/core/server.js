import http from "http";
import { handleRequest, get, post, put, delet} from "#core";

/**
 * Starts an HTTP server.
 * @param {number} port - The port on which the server will listen.
 * @param {string} host - The host address to bind the server to.
 * @returns {Promise<http.Server>} - A promise that resolves to the created server instance.
 */

function startServer(port, host) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handleRequest);

    server.on('error', (error) => {
      reject(error);
    });

    server.listen(port, host, () => {
      resolve(server);
    });
  });
}

/**
 * Lists information about the running server.
 * @param {number} port - The port on which the server is running.
 * @param {string} host - The host address to which the server is bound.
 */

function list(port, host) {
  startServer(port, host)
    .then((server) => {
      console.log(`Server running on http://${host}:${port}`);
    })
    .catch((error) => {
      console.error('Error starting server:', error);
    });
}

// Exporting functions
export default {
  list: list,
  get: get,
  post: post,
  put: put,
  delete: delet,
};