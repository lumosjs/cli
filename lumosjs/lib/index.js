import server from "#core/server";
import apiRoutes from "#routes/api";
import webRoutes from "#routes/web";
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

  // Set up web routes
  webRoutes({ get: server.web });

  // Get port and host from environment variables
  const port = process.env.APP_PORT;
  const host = process.env.APP_URL;

  // Start the server
  server.list(port, host);
}
