// Importing modules
import parseRequestBody from "./parseRequestBody.js";
import { routes, get, post, put, delet, web } from "./routes.js";
import { logger } from "#utils/logs";
import { handleNotFound, handleBadRequest, handleMethodNotAllowed } from "#status";
import renderView from "./renderView.js";
import { renderFile } from "./renderFile.js";
import { configHeaders } from "#config/headers";

// Main request handling function
async function handleRequest(request, response) {
  const { url, method } = request;

  // Rendering file and configuring headers
  renderFile(request, response);
  configHeaders(request, response);

  // Utility functions
  async function status(code) {
    response.statusCode = code;
  }

  async function log(...messages) {
    console.log(...messages);
  }

  async function send(body) {
    response.end(body.toString());
  }

  async function setHeader(header, value) {
    response.setHeader(header, value);
  }

  async function go(path) {
    response.writeHead(302, { Location: path });
    response.end();
  }

  async function json(data) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  }

  async function view(viewName, data) {
    await renderView(customResponse, viewName, data);
  }

  // Creating the customResponse object
  const customResponse = { log, send, json, view, setHeader, status, go };

  let routeFound = false;
  for (const route of routes) {
    const match = url.match(route.regexPath);

    if (match) {
      routeFound = true;
      if (route.method === method) {
        if (["POST", "PUT", "DELETE"].includes(method)) {
          try {
            const body = await parseRequestBody(request);
            request.body = body.data;
          } catch (error) {
            await logger.error("Error parsing request body: " + error);
            return handleBadRequest(request, customResponse);
          }
        }

        const param = {};
        for (let i = 0; i < route.paramNames.length; i++) {
          const paramName = route.paramNames[i];
          param[paramName] = match[i + 1];
        }

        request.params = param;
        request.cookies = "";

        await runMiddlewares(request, customResponse, route.handlers);
        return;
      } else {
        // Handling cases where the method doesn't match
        return await handleMethodNotAllowed(request, customResponse, route.method);
      }
    }
  }

  if (!routeFound) {
    await handleNotFound(request, customResponse);
  }
}

// Running middlewares in sequence
async function runMiddlewares(request, customResponse, handlers) {
  if (!handlers || handlers.length === 0) {
    return;
  }

  const currentHandler = handlers[0];

  await currentHandler(request, customResponse, async () => {
    await runMiddlewares(request, customResponse, handlers.slice(1));
  });
}

// Exporting functions
export { handleRequest, get, post, put, delet , web};