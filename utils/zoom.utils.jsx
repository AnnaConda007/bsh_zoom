import axios from 'axios';
import { listMeetUrl, NewMeetUrl } from '../contains';

export const getZoomToken = async (redirect) => {
	const urlParams = new URLSearchParams(window.location.search);
	const authorizationCode = urlParams.get('code');
	if (authorizationCode === null) return;

	return axios
		.get('http://localhost:3000/exchangeCode', {
			params: {
				code: authorizationCode,
				redirecturl: redirect,
			},
		})
		.then((response) => {
			return response.data.access_token;
		})
		.catch((error) => {
			console.error('Error retrieving access token:', error);
		});
};

export const getListMeet = async () => {
	getZoomToken(listMeetUrl)
		.then((res) => {
			const token = res || tokenFromLocalStorage;
			const accessToken = token;
			console.log(accessToken);
			axios
				.get('http://localhost:3000/listMeetings', {
					params: {
						token: accessToken,
					},
				})
				.then((response) => {
					console.log(response.data.meetings);
				})
				.catch((error) => {
					console.error('Error retrieving list meet:', error);
				});
		})
		.catch((error) => {
			console.error('Error getting Zoom token:', error);
		});
};

export const createMeet = async () => {
	getZoomToken(NewMeetUrl)
		.then((token) => {
			if (token === undefined) return;
			const accessToken = token;
			const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
			const timeStart = localStorage.getItem('timeStart') || null;
			const timeEnd = localStorage.getItem('timeEnd') || null;
			const conferenceDuration = calculateMinuteDifference(timeStart, timeEnd);
			axios
				.get('http://localhost:3000/newConference', {
					params: {
						conferenceTopic: conferenceTopic,
						timeStart: timeStart,
						conferenceDuration: conferenceDuration,
						token: accessToken,
					},
				})
				.then((response) => {
					console.log(response.data.meeting);
				})
				.catch((error) => {
					console.error('Error creating Zoom meeting:', error);
				});
		})
		.catch((error) => {
			console.error('Error getting Zoom token:', error);
		});
	//window.location.href = '/';
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
