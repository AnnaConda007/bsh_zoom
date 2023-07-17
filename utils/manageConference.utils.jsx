import { updateAccesToken } from './getZoomData.utils';
import { calculateDuration } from './calculat.utils';
import { limitErrorMessage } from '../contains';
import axios from 'axios';

export const createMeet = async (SetErrorExsist, SetErrorMessage, conferenceTopic, timeStart, timeEnd) => {
	try {
		let accessToken = localStorage.getItem('zoomAccesToken');
		const userName = localStorage.getItem('email') || null;
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
		if (error.response && error.response.data.code === 124) {
			await updateAccesToken();
			return await createMeet();
		} else if (error.response.data.code === 429) {
			SetErrorExsist(true), SetErrorMessage(limitErrorMessage);
		}
		console.error('Error creating meeting:', error.response.data);
	}
};

export const updateConferenceInfo = async (idTopic, newData) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = idTopic;
	const data = newData;

	const response = await axios.patch('http://localhost:3000/updateConferenceInfo', {
		accessToken: accessToken,
		id: id,
		data: data,
	});
	return response.data;
};

export const deleteConference = async (conferenceId) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = conferenceId;

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
};
