import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs-extra';
/**
 * Uploads an image to WordPress from the local file system.
 * @param {string} imagePath - Path to the image file on your PC.
 * @returns {Promise<Object>} - The response from the WordPress API with uploaded image info.
 */
async function uploadImageToWordPress(imagePath) {
  const wpUser = process.env.WP_USER; // Get from env
  const wpAppPassword = process.env.WP_APP_PASSWORD; // Get from env

  // Create FormData to hold the image file
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));

  // Authorization header with Base64 encoded credentials
  const auth = Buffer.from(`${wpUser}:${wpAppPassword}`).toString('base64');

  try {
    // Make the API request to upload the image
    const response = await axios.post(process.env.WP_API_URL, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${auth}`,
      },
    });

    // Return the API response data
    return response.data;
  } catch (error) {
    console.error(
      'Error uploading image:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export default uploadImageToWordPress;
