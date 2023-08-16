import fs from 'fs/promises';
import path from 'path';

/**
 * Deletes a file located in the public directory.
 * @param {string} filePath - The relative path of the file to be deleted.
 * @returns {Promise<string>} - A promise that resolves to a success message or an error message.
 */

export function unlink(filePath) {
  const currentFileUrl = import.meta.url;
  const currentFilePath = new URL('.', currentFileUrl).pathname;
  const publicPath = path.join(currentFilePath, '..', '..', 'public');

  const fullFilePath = path.join(publicPath, filePath);

  return fs.access(fullFilePath, fs.constants.F_OK)
    .then(() => {
      return fs.unlink(fullFilePath)
        .then(() => {
          return `File deleted successfully: ${filePath}`;
        })
        .catch((err) => {
          throw `Error deleting the file: ${err}`;
        });
    })
    .catch(() => {
      throw `This file does not exist: ${filePath}`;
    });
}
