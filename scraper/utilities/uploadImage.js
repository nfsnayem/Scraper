import processImage from "../lib/imageProcessor.js";
import uploadImageToWordPress from "../lib/uploadImageToWordPress.js";
import saveImagesArray from "./saveImagesArray.js";

async function uploadImage(images) {
    try {
            const imagesData = { main: {}, colors: [], exterior: [] };

            if (images.main) {
              const path = await processImage(images.main, null);
              const result = await uploadImageToWordPress(path);
              imagesData.main = result;
            }
            const colors = await saveImagesArray(images.colors, images.main);
            imagesData.colors = colors;

            const exterior = await saveImagesArray(
              images.exterior,
              images.main
            );

            imagesData.exterior = exterior;
            return imagesData;

    } catch(error) {
        console.log(error);
    }
}

export default uploadImage;