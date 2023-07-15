import { updateAccesToken } from './getZoomData.utils';
import { calculateDuration } from './calculat.utils';
import axios from 'axios';

export const createMeet = async () => {
	try {
		let accessToken = localStorage.getItem('zoomAccesToken');
		const userName = localStorage.getItem('email') || null;
		const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
		const timeStart = localStorage.getItem('timeStart') || null;
		const timeEnd = localStorage.getItem('timeEnd') || null;
		const conferenceDuration = calculateDuration(timeStart, timeEnd);
		const topicValue = {
			creator: userName,
			value: conferenceTopic,
		};
		const response = await axios.get('http://localhost:3000/newConference', {
			params: {
				conferenceTopic: JSON.stringify(topicValue),
				timeStart: timeStart,
				conferenceDuration: conferenceDuration,
				token: accessToken,
			},
		});
		console.log(response.data.meeting);
	} catch (error) {
		if (error.response && error.response.status === 401) {
			await updateAccesToken();
			return await createMeet();
		}
		console.error('Error creating meeting:', error);
	}
};

export const updateConferenceInfo = async (idTopic, newData) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = idTopic;
	const data = newData;
	try {
		const response = await axios.patch('http://localhost:3000/updateConferenceInfo', {
			accessToken: accessToken,
			id: id,
			data: data,
		});
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			await updateAccesToken();
			return await updateConferenceInfo(idTopic, newData);
		}
		console.error('Error update meetings:', error);
	}
};

export const deleteConference = async (conferenceId) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = conferenceId;
	try {
		const response = await axios.delete('http://localhost:3000/deleteConference', {
			data: {
				accessToken: accessToken,
				id: id,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('прошел час ');
			await updateAccesToken();
			return await deleteConference(conferenceId);
		}
		console.error('Error delete meetings:', error);
	}
};
