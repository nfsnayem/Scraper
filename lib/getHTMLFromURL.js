import https from 'https';
import fetch from 'node-fetch';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getHTMLFromURL = async (url) => {
  try {
    const response = await fetch(url, {
      agent,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    // using await to ensure that the promise resolves
    const body = await response.text();
    return body;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getHTMLFromURL;
