import axios from 'axios';
import express from 'express';
import cors from 'cors';
import { clientId, clientSecret } from './contains.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/exchangeCode', async (req, res) => {
	const authorizationCode = req.query.code;
	const redirecturl = req.query.redirecturl;

	try {
		const response = await axios.post('https://zoom.us/oauth/token', null, {
			params: {
				grant_type: 'authorization_code',
				code: authorizationCode,
				redirect_uri: redirecturl,
			},
			headers: {
				Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			},
		});
		const refreshToken = response.data.refresh_token;
		const accessToken = response.data.access_token;
		res.send({ refresh_token: refreshToken, access_token: accessToken });
	} catch (error) {
		console.error('Error exchanging code for token:', error);
		res.status(500).send('Error exchanging code for token');
	}
});

app.post('/refreshToken', async (req, res) => {
	const refreshToken = req.body.refreshToken;
	try {
		const response = await axios.post('https://zoom.us/oauth/token', null, {
			params: {
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			},
			headers: {
				Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			},
		});

		const newAccessToken = response.data.access_token;
		const newRefreshToken = response.data.refresh_token;
		console.log('newAccessToken', newAccessToken);
		console.log('newRefreshToken', newRefreshToken);
		res.send({
			access_token: newAccessToken,
			refresh_token: newRefreshToken,
		});
	} catch (error) {
		console.error('Error refreshing access token:', error);
		res.status(500).send('Error refreshing access token');
	}
});

app.get('/newConference', async (req, res) => {
	const accessToken = req.query.token;
	const conferenceTopic = req.query.conferenceTopic;
	const timeStart = req.query.timeStart;
	const conferenceDuration = req.query.conferenceDuration;
	try {
		const meetingResponse = await axios.post(
			'https://api.zoom.us/v2/users/me/meetings',
			{
				topic: conferenceTopic,
				type: 2,
				start_time: timeStart,
				duration: conferenceDuration,
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
		res.send({ meeting: meetingResponse.data });
	}catch (error) {
		console.log('Error retrieving meetings:', error.response.data);
		if (error.response.data.code === 124) {
			res.status(401).send(error.response.data);
		} else {
			res.status(500).send(error.response.data);
		}
	}
});

app.get('/listMeetings', async (req, res) => {
	const accessToken = req.query.accessToken;
	console.log('accessToken', accessToken);
	try {
		let allMeetings = [];
		let nextPageToken = '';
		do {
			const response = await axios.get(
				`https://api.zoom.us/v2/users/me/meetings?page_size=300&next_page_token=${nextPageToken}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const meetings = response.data;
			allMeetings = [...allMeetings, ...meetings.meetings];
			nextPageToken = meetings.next_page_token;
		} while (nextPageToken);
		res.send({ meetings: allMeetings });
	} catch (error) {
		console.log('Error retrieving meetings:', error.response.data);
		if (error.response.data.code === 124) {
			res.status(401).send(error.response.data);
		} else {
			res.status(500).send(error.response.data);
		}
	}
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

/*
 try {
 const meetingResponse = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          topic:conferenceTopic,
          pre_schedule:true,
          type: 2,  
          start_time:timeStart,  
          duration: conferenceDuration,  
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
 res.send({  meeting: meetingResponse.data });
    } catch (error) {
      console.log('Error creating Zoom meeting:', error.response.data);
      res.status(500).send('Error creating Zoom meeting');
    } */
