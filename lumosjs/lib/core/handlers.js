// handler.js
import parseRequestBody from "./parseRequestBody.js";
import { routes, get, post, put, delet } from "./routes.js";
import { logger } from "#utils/logs";
import { handleNotFound, handleBadRequest, handleMethodNotAllowed } from "#status";
import { renderFile } from "./renderFile.js";
import { configHeaders } from "#config/headers";

async function handleRequest(request, response) {
  const { url, method } = request;

  renderFile(request,response);
  configHeaders(request,response);
  
   if (method === 'OPTIONS') {
     response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type,X-Requested-With'
    });
    response.end();
    return;
  }

  async function status(body){
    response.statusCode = body;
  }

  async function log(...messages) {
    console.log(...messages);
  }

  async function send(body) {
    response.end(body.toString());
  }

  async function setHeader(body,value){
     response.setHeader(body,value);
  }

  async function go(path){
    response.writeHead(302, { Location:path});    
    response.end();
  }
   


  async function json(data) {
    response.writeHead(200, { "Content-Type": "application/json"});
    response.end(JSON.stringify(data));
  }


  const customResponse = { log, send, json, setHeader, status, go};

  let routeFound = false;
  for (const route of routes) {
    const match = url.match(route.regexPath);

    if (match) {
      routeFound = true;
      if (route.method === method) {

         if (method === "POST" || method === "PUT" || method === "DELETE") {
          try {
            const body = await parseRequestBody(request);
            request.body = body.data;
          } catch (error) {
            await logger.error("Error parsing request body:" + error);
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
      } else if (method === "GET" && route.method === "POST" || route.method === "DELETE" || route.method === "PUT") {
        return await handleMethodNotAllowed(request, customResponse, route.method);
      }else if (method === "POST" || method === "DELETE" || method === "PUT" && route.method === "GET") {
        return await handleMethodNotAllowed(request, customResponse, route.method);
      }
    }
  }

  if (!routeFound) {
    await handleNotFound(request, customResponse);
  }
}

async function runMiddlewares(request, customResponse, handlers) {
  if (!handlers || handlers.length === 0) {
    return;
  }

  const currentHandler = handlers[0];

  await currentHandler(request, customResponse, async () => {
    await runMiddlewares(request, customResponse, handlers.slice(1));
  });
}

export { handleRequest, get, post, put, delet };
