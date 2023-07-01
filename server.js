import express from 'express';
import axios from 'axios';
import cors from 'cors';
 
import { clientId, clientSecret, redirectUri } from "./contains.js";
 
const app = express();
const port = 3000;
app.use(cors());
 
const zoomTokenUrl = 'https://zoom.us/oauth/token';

app.get('/exchangeCode', async (req, res) => {
   const authorizationCode = req.query.code;  
    console.log("authorizationCode", authorizationCode);

    const data = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri
    };

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(zoomTokenUrl, data, {
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error exchanging code for access token:', error.response.data);
        res.status(500).send('Error exchanging code for access token');
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
