import fs from 'fs';
import path from 'path';

/**
 * Uploads a single file to the specified folder.
 * @param {string} folder - The target folder for uploading.
 * @param {object} file - The file object containing filename, mimeType, and data.
 * @param {string[]} allowedMimeTypes - The allowed MIME types for the uploaded file.
 * @param {string} path_public - The public path for saving the file.
 * @param {string} newName - The new name for the uploaded file (optional).
 * @returns {Promise<string>} - A promise that resolves to the uploaded file path.
 */

function uploadSingle(folder, file, allowedMimeTypes, path_public, newName) {
  return new Promise((resolve, reject) => {
    const fileType = file.filename.mimeType.split("/")[1];
    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(fileType)) {
      const errorMessage = `Invalid file type ${fileType}`;
      return reject(errorMessage);
    }

    fs.mkdir(`${path_public}/${folder}`, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.filename.filename);
        const newFileName = newName ? newName : `${uniqueSuffix}${fileExt}`;
        const filePath = path.join(`${path_public}/${folder}`, newFileName);


        fs.writeFile(filePath, file.data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(filePath.slice(7));
          }
        });
      }
    });
  });
}

/**
 * Uploads multiple files to the specified folder.
 * @param {string} folder - The target folder for uploading.
 * @param {object} files - An object containing multiple file objects.
 * @param {string[]} allowedMimeTypes - The allowed MIME types for the uploaded files.
 * @param {string} path_public - The public path for saving the files.
 * @param {string} newName - The new name for the uploaded files (optional).
 * @returns {Promise<string[]>} - A promise that resolves to an array of uploaded file paths.
 */


function uploadMultiple(folder, file, allowedMimeTypes, path_public, newName) {
  if (typeof file === "object" && Object.keys(file).length > 0) {
    const promises = [];

    for (const key in file) {
      const currentFile = file[key];
      promises.push(uploadSingle(folder, currentFile, allowedMimeTypes, path_public, newName));
    }

    return Promise.all(promises);
  } else {
    throw new Error("Invalid file format. Expecting an object with multiple files.");
  }
}

// Exporting functions
export { uploadSingle, uploadMultiple };