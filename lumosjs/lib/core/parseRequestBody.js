import Busboy from "busboy";
import fs from 'fs';

/**
 * Parses the request body based on the content type.
 * Supports multipart/form-data and application/json content types.
 * @param {http.IncomingMessage} req - The request object.
 * @returns {Promise} - A promise that resolves to the parsed data.
 */

export default async function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers["content-type"];
    let data = "";

    if (contentType && contentType.startsWith("multipart/form-data")) {
      // Parsing multipart/form-data
      const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
      const boundary = boundaryMatch ? boundaryMatch[1] || boundaryMatch[2] : undefined;

      if (!boundary) {
        reject(new Error('Boundary not found in the content-type header.'));
        return;
      }

      const busboy = Busboy({ headers: req.headers, boundary });
      const formData = { fields: {}, files: {} };

      busboy.on('field', (fieldname, val) => {
        formData.fields[fieldname] = val;
      });

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const chunks = [];
        file.on('data', (chunk) => {
          chunks.push(chunk);
        });

        file.on('end', () => {
          formData.files[fieldname] = {
            filename,
            encoding,
            mimetype,
            data: Buffer.concat(chunks),
          };
        });
      });

      busboy.on('finish', () => {
        const data = formData.fields ? formData.fields : {};
        const files = formData.files ? formData.files : {};
        resolve({ data: { data, files } });
      });

      busboy.on('error', (err) => {
        reject(err);
      });

      req.pipe(busboy);
    } else if (contentType && contentType.startsWith("application/json")) {
      // Parsing application/json
      req.on("data", (chunk) => {
        data += chunk.toString();
      });

      req.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ data: jsonData });
        } catch (err) {
          reject(err);
        }
      });
    } else {
      // Unsupported content type
      reject(new Error("Unsupported content type."));
    }

    req.on("error", (err) => {
      reject(err);
    });
  });
}