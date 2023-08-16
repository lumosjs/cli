import { convertMinutesToMilliseconds } from "#helpers/convertMinutesToMilliseconds";

/**
 * Gets the client's IP address from the request.
 * @param {http.IncomingMessage} request - The request object.
 * @returns {string} - The client's IP address.
 */

function getClientIp(request) {
  const forwardedForHeader = request.headers['x-forwarded-for'];
  if (forwardedForHeader) {
    return forwardedForHeader.split(',')[0];
  }
  return request.connection.remoteAddress;
}

/**
 * Removes IP from the rate limiting list.
 * @param {string} ip - The IP address to be removed.
 * @param {object} ipRequestUser - The IP request user mapping.
 */

function responseIpRequestUser(ip, ipRequestUser) {
  delete ipRequestUser[ip];
}

/**
 * Creates a rate limiting middleware.
 * @param {number} limit - The maximum number of requests allowed within the specified interval.
 * @param {number} minute - The interval in minutes.
 * @returns {function} - The rate limiting middleware.
 */

export function rateLimit(limit, minute) {
  const intervalInMilliseconds = convertMinutesToMilliseconds(minute);
  const ipRequestUser = {};

  return async (request, response, next) => {
    const ip = getClientIp(request);

    if (!ipRequestUser[ip]) {
      ipRequestUser[ip] = {
        count: 1,
        remainingRequestUser: limit - 1,
        responseTime: Date.now() + intervalInMilliseconds,
      };

      setTimeout(() => {
        responseIpRequestUser(ip, ipRequestUser);
      }, intervalInMilliseconds);
    } else {
      if (ipRequestUser[ip].count >= limit) {
        const remainingTime = ipRequestUser[ip].responseTime - Date.now();
        
        response.setHeader('Retry-After', Math.ceil(remainingTime / 1000).toString());
        response.setHeader('X-RateLimit-Limit', limit.toString());
        response.setHeader('X-RateLimit-Remaining', '0');
        response.setHeader('X-RateLimit-Reset', Math.ceil(ipRequestUser[ip].responseTime / 1000).toString());

        response.status(429);
        response.send('Too many requests.');
        return;
      }

      ipRequestUser[ip].count++;
      ipRequestUser[ip].remainingRequestUser--;

      if (ipRequestUser[ip].remainingRequestUser === 0) {
        response.setHeader('Retry-After', Math.ceil(intervalInMilliseconds / 1000).toString());
        response.setHeader('X-RateLimit-Limit', limit.toString());
        response.setHeader('X-RateLimit-Remaining', '0');
        response.setHeader('X-RateLimit-Reset', Math.ceil(ipRequestUser[ip].responseTime / 1000).toString());

        response.status(429);
        response.send('Too many requests.');
        return;
      }
    }

    response.setHeader('X-RateLimit-Limit', limit.toString());
    response.setHeader('X-RateLimit-Remaining', ipRequestUser[ip].remainingRequestUser.toString());
    response.setHeader('X-RateLimit-Reset', Math.ceil(ipRequestUser[ip].responseTime / 1000).toString());
    response.status(200);
    
    await next();
  };
}