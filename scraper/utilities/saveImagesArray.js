import getFileExtensionFromUrl from '../lib/getFileExtension.js';
import processImage from '../lib/imageProcessor.js';
import uploadImageToWordPress from '../lib/uploadImageToWordPress.js';

async function saveImagesArray(imageLinks, main) {
  const removeMain = imageLinks.filter((link) => {
    return link !== main;
  });

  const promises = removeMain.map(async (url) => {
    if (
      getFileExtensionFromUrl(url) === '.jpeg' ||
      getFileExtensionFromUrl(url) === '.webp' ||
      getFileExtensionFromUrl(url) === '.jpg' ||
      getFileExtensionFromUrl(url) === '.png'
    ) {
      const path = await processImage(url);
      const res = await uploadImageToWordPress(path);
      return res;
    }
    return null; // Return null for unsupported formats
  });

  // Wait for all promises to resolve
  const results = await Promise.all(promises);

  // Filter out null results for unsupported formats
  return results.filter((res) => res !== null);
}

export default saveImagesArray;
