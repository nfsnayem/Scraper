import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import getAuth from '../lib/getAuth.js';
import processImage from '../lib/imageProcessor.js';
import scrap from '../lib/scrap.js';
import uploadImageToWordPress from '../lib/uploadImageToWordPress.js';
import saveImagesArray from '../utilities/saveImagesArray.js';
import transformProductData from '../utilities/transformProductData.js';
import uploadImage from '../utilities/uploadImage.js';

export const app = express();

app.use(cors());
app.use(express.json());


// get specifications
app.get('/', async (req, res) => {
  const url = req.query.url;
  if (url?.includes('https://www.mobiledokan.com/')) {
    try {
      const data = await scrap(url);
      res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res
      .status(400)
      .json({ error: true, message: 'url must be includes mobiledokan.com' });
  }
});

// Upload images to wordpress server
app.post('/upload-images', async (req, res) => {
  try {
    // Response object
    const responseObject = { main: {}, colors: [], exterior: [] };

    if (req.body.main) {
      const path = await processImage(req.body.main, null);
      const result = await uploadImageToWordPress(path);
      responseObject.main = result;
    }

    const colors = await saveImagesArray(req.body.colors, req.body.main);
    responseObject.colors = colors;

    const exterior = await saveImagesArray(req.body.exterior, req.body.main);
    responseObject.exterior = exterior;

    res.status(200).json(responseObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/push-data-from-mobiledokan-com', async (req, res) => {
        const url = req.query.url;
        if (url?.includes('https://www.mobiledokan.com/mobile/')) {
          try {
            const data = await scrap(url);
            const images = await uploadImage(data.images);

            data.images.thumbnail = images.main.id;
            const colors =  images.colors.map(color => color.id);
            const exterior = images.exterior.map((exterior) => exterior.id);
            data.images.gallery = colors.concat(exterior);


            const transformedData = transformProductData(data);

            const response = await axios({
              method: 'POST',
              url: `${process.env.WP_SITE_URL}/wp-json/aps-products/v1/save`,
              headers: {
                Authorization: `Basic ${getAuth()}`,
                'Content-Type': 'application/json',
              },
              data: JSON.stringify(transformedData),
            });
            res.json({status: 'success', message: 'Product Added!'});
          } catch (error) {
            console.log(error);
            res.status(400).json(error);
          }
        } else {
          res
            .status(400)
            .json({
              error: true,
              message: 'url must be includes mobiledokan.com',
            });
        }
})