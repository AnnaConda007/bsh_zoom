import axios from 'axios';
import express from 'express';
import cors from 'cors';
import { clientId, clientSecret, redirectUri } from './contains.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/exchangeCode', async (req, res) => {
    const authorizationCode = req.query.code;
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
 
         try {
            const meetingResponse = await axios.post(
                'https://api.zoom.us/v2/users/me/meetings', // me
                {
                    topic: 'Test Meeting',
                    type: 1,
                    settings: {
                        host_video: true,
                        participant_video: true,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
             res.send({ access_token: accessToken, meeting: meetingResponse.data });
        } catch (error) {
            console.log('Error creating Zoom meeting:', error.response.data);
            res.status(500).send('Error creating Zoom meeting');
        }
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).send('Error exchanging code for token');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
