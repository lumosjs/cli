import fs from 'fs';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * Renders a file in the response based on the request URL.
 * @param {http.IncomingMessage} request - The request object.
 * @param {http.ServerResponse} response - The response object.
 */

export function renderFile(request, response) {
  const currentFileUrl = import.meta.url;
  const currentFilePath = dirname(fileURLToPath(currentFileUrl));
  const pathPublic = process.env.PATH_PUBLIC;
  const publicPath = join(currentFilePath, pathPublic).replace('/lib/core', '');

  const filePath = join(publicPath, request.url.replace(/\.\.\//g, ''));

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return;
    }

    const contentType = getContentType(filePath);
    response.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(response);
  });
}

/**
 * Gets the content type based on the file extension.
 * @param {string} filePath - The path to the file.
 * @returns {string} - The content type.
 */

function getContentType(filePath) {
  const ext = extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}