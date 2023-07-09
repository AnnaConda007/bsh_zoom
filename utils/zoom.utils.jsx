import axios from 'axios';

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
			throw error;
		});
};

export const getListMeeting = () => {};

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
console.log(iso8601Date)
	return iso8601Date;
};

export const calculateMinuteDifference = (date1, date2) => {
	const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	return minutes;
};
