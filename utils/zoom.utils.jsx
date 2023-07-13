import axios from 'axios';
import { formatedDateFromZoom, formateTimeFromZoom } from './formatting.utils';
import { calculatTimeEnd, calculateDuration } from './calculat.utils';
import { updateAccesToken } from './tokensZoom.utils';

export const getListMeeting = async () => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	try {
		const response = await axios.get('http://localhost:3000/listMeetings', {
			params: {
				accessToken: accessToken,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const updatedTokenData = await updateAccesToken();
			accessToken = updatedTokenData.access_token;
			await getListMeeting();
		} else {
			console.error('Error retrieving meetings:', error.response.data);
			throw error;
		}
	}
};

export const createMeet = async () => {
	try {
		let accessToken = localStorage.getItem('zoomAccesToken');
		const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
		const timeStart = localStorage.getItem('timeStart') || null;
		const timeEnd = localStorage.getItem('timeEnd') || null;
		const conferenceDuration = calculateDuration(timeStart, timeEnd);
		const response = await axios.get('http://localhost:3000/newConference', {
			params: {
				conferenceTopic: conferenceTopic,
				timeStart: timeStart,
				conferenceDuration: conferenceDuration,
				token: accessToken,
			},
		});
		console.log(response.data.meeting);
		// window.location.href = '/';
	} catch (error) {
		console.error('Error creating meeting:', error); //!!!!!!! добавь обновление токенво
	}
};
