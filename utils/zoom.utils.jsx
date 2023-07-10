import axios from 'axios';
import { token } from '../contains';

export const getZoomToken = async (redirect) => {
	const urlParams = new URLSearchParams(window.location.search);
	const authorizationCode = urlParams.get('code');
	if (authorizationCode === null) return;

	try {
		const response = await axios.get('http://localhost:3000/exchangeCode', {
			params: {
				code: authorizationCode,
				redirecturl: redirect,
			},
		});

		return response.data.access_token;
	} catch (error) {
		console.error('Error retrieving access token:', error);
	}
};

export const getListMeet = async () => {
	try {
		const response = await axios.get('http://localhost:3000/listMeetings', {
			params: {
				token: token,
			},
		});
		console.log(response.data.meetings);
		return response.data.meetings;
	} catch (error) {
		console.error('Error retrieving list meet:', error);
	}
};

export const createMeet = async () => {
	try {
		const accessToken = token;
		const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
		const timeStart = localStorage.getItem('timeStart') || null;
		const timeEnd = localStorage.getItem('timeEnd') || null;
		const conferenceDuration = calculateMinuteDifference(timeStart, timeEnd);
		const response = await axios.get('http://localhost:3000/newConference', {
			params: {
				conferenceTopic: conferenceTopic,
				timeStart: timeStart,
				conferenceDuration: conferenceDuration,
				token: accessToken,
			},
		});
		console.log(response.data.meeting);
	} catch (error) {
		console.error('Error creating Zoom meeting:', error);
	}
	// window.location.href = '/';
};

export const formatedDataForZoom = (selectedTime, activeDate) => {
	const timeObj = new Date(selectedTime);
	const dateSegments = activeDate.split('-').reverse();
	const dateObj = new Date(dateSegments.join('-'));

	const year = dateObj.getFullYear();
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObj.getDate().toString().padStart(2, '0');
	const hours = timeObj.getHours().toString().padStart(2, '0');
	const minutes = timeObj.getMinutes().toString().padStart(2, '0');
	const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
	console.log(iso8601Date);
	return iso8601Date;
};

export const calculateMinuteDifference = (date1, date2) => {
	const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	return minutes;
};

export const getTaggedDates = async () => {
	const datesArr = [];
	const listMeet = await getListMeet();
	const meetings = listMeet.meetings;
	console.log(meetings);
	meetings.forEach((meeting) => {
		const startTime = meeting.start_time;
		const dateTime = new Date(startTime);
		const year = dateTime.getFullYear();
		const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
		const day = dateTime.getDate().toString().padStart(2, '0');
		const formattedDate = `${day}-${month}-${year}`;
		datesArr.push(formattedDate);
	});
	return datesArr;
};
