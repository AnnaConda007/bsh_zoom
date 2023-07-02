import axios from 'axios';
import express from 'express';
import cors from 'cors';
import { clientId, clientSecret, redirectUri } from './contains.js';

const app = express();
const port = 3000;

 app.use(cors());

app.get('/exchangeCode', async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    return res.status(400).send('No authorization code provided');
  }

  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    const accessToken = response.data.access_token;
    console.log('Access token:', accessToken);
    res.send({ access_token: accessToken });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Error exchanging code for token');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
