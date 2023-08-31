import server from "#core/server";
import apiRoutes from "#routes/api";
import * as dotenv from 'dotenv';

/**
 * Run the application.
 */
export function runApp() {
  dotenv.config();
  

  // Set up API routes
  apiRoutes({
    get: server.get,
    post: server.post,
    put: server.put,
    delete: server.delete
  });

  // Get port and host from environment variables
  const port = process.env.SERVER_PORT;
  const host = process.env.SERVER_HOST;

  // Start the server
  server.list(port, host);
}
