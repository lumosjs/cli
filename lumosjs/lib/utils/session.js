import { parse, serialize } from 'cookie';
import { convertMinutesToMilliseconds } from "#helpers/convertMinutesToMilliseconds";

const sessions = {};

function generateSessionId() {
  return Math.random().toString(36).substring(2);
}

/**
 * Middleware to set a session.
 * @param {string} name - The name of the session.
 * @param {*} value - The value of the session.
 * @returns {function} - The session setting middleware.
 */
export function setSession(name, value) {
  return async (request, response) => {
    const sessionId = request.headers.cookie ? parse(request.headers.cookie)[name] : null;

    if (!sessionId || !sessions[sessionId]) {
      const newSessionId = generateSessionId();
      sessions[newSessionId] = { data: value, createdAt: Date.now() };

      const cookieOptions = {
        httpOnly: true,
        sameSite: 'strict'
      };

      const cookieValue = serialize(name, newSessionId, cookieOptions);
      response.setHeader('Set-Cookie', cookieValue);
      request.session = sessions[newSessionId].data;
    }
  };
}

/**
 * Middleware to get a session.
 * @param {string} name - The name of the session.
 * @returns {function} - The session getting middleware.
 */
export function getSession(name) {
  return (request, response) => {
    const sessionId = request.headers.cookie ? parse(request.headers.cookie)[name] : null;

    if (!sessionId || !sessions[sessionId]) {
      request.session = null;
      return false;
    } else {
      request.session = sessions[sessionId].data;
      return true;
    }
  };
}

/**
 * Middleware to destroy a session.
 * @param {string} name - The name of the session.
 * @returns {function} - The session destroying middleware.
 */
export function destroy(name) {
  return (request, response) => {
    const sessionId = request.headers.cookie ? parse(request.headers.cookie)[name] : null;

    if (sessionId && sessions[sessionId]) {
      delete sessions[sessionId];
      response.setHeader('Set-Cookie', `sessionId=; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1270 00:00:00 GMT`);
      return true;
    }
  };
}