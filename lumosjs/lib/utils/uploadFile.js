import { uploadSingle, uploadMultiple } from '#helpers/fileUpload';

/**
 * Factory function to create a file upload instance.
 * @param {string} folder - The destination folder for the uploaded files.
 * @param {*} file - The file or files to be uploaded.
 * @param {string} newName - The new name for the uploaded file (optional).
 * @returns {object} - The file upload instance.
 */
function upload(folder, file, newName) {
  const path_public = process.env.PATH_PUBLIC;

  const instance = {
    allowedMimeTypes: [],

    /**
     * Set allowed MIME types for the file upload.
     * @param  {...string} mimeTypes - List of allowed MIME types.
     * @returns {object} - The file upload instance with updated allowed MIME types.
     */
    type: function (...mimeTypes) {
      instance.allowedMimeTypes = mimeTypes;
      return instance;
    },

    /**
     * Perform multiple file uploads.
     * @returns {Promise} - A promise for the multiple file upload process.
     */
    mult: function () {
      return uploadMultiple(folder, file, instance.allowedMimeTypes, path_public, newName);
    },

    /**
     * Perform a single file upload.
     * @returns {Promise} - A promise for the single file upload process.
     */
    single: function () {
      return uploadSingle(folder, file, instance.allowedMimeTypes, path_public, newName);
    },
  };

  return instance;
}

export default upload;