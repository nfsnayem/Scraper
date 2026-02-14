import path from 'path';

/**
 * Gets the file extension from a URL.
 * @param {string} fileUrl - The URL of the file.
 * @returns {string} - The file extension (including the dot), or an empty string if none exists.
 */
function getFileExtensionFromUrl(fileUrl) {
  const parsedUrl = new URL(fileUrl);
  const pathname = parsedUrl.pathname; // Extract the path part of the URL
  const extension = path.extname(pathname); // Get the file extension

  return extension;
}
export default getFileExtensionFromUrl;
