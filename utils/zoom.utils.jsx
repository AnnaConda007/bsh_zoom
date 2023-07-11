import axios from 'axios';

export const getZoomToken = async (redirect) => {
	try {
		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');
		if (!localStorage.getItem('zoomRefreshToken')) {
			const response = await axios.get('http://localhost:3000/exchangeCode', {
				params: {
					code: authorizationCode,
					redirecturl: redirect,
				},
			});
			localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
			localStorage.setItem('zoomAccesToken', response.data.access_token);
			console.log(response.data.refresh_token);
			console.log(response.data.access_token);
			return response.data;
		}
	} catch (error) {
		console.error('Error retrieving refresh token:', error);
		throw error;
	}
};

export const updateAccesToken = async () => {
	const refreshToken = localStorage.getItem('zoomRefreshToken');
	const response = await axios.post('http://localhost:3000/refreshToken', {
		refreshToken: refreshToken,
	});
	localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
	localStorage.setItem('zoomAccesToken', response.data.access_token);
	console.log(
		'новые токены:',
		'zoomAccesToken',
		response.data.refresh_token,
		'zoomRefreshToken',
		response.data.access_token
	);
	return response.data;
};

export const getListMeeting = async () => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	//let accessToken ="eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImEyMjI0YjRlLWM5NzItNGM3MC05NTIxLThjODlhOWRhYTQ1MCJ9.eyJ2ZXIiOjksImF1aWQiOiIwMWI4OGFmMjcyNmJiMTc3YmM3NGU0YWQ5ZTFjMzg0OCIsImNvZGUiOiJibWxhWTBQeWhISkRFcExOY1dFUzNHWXVOaUNGdjFpVFEiLCJpc3MiOiJ6bTpjaWQ6d1lJTEVkM3RRbkNDazRDRTZKaWh4ZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJLOVBzYUZYM1RrT0k2cU5LcE5xOW53IiwibmJmIj oxNjg5MDg2NDQyLCJleHAiOjE2ODkwOTAwNDIsImlhdCI6MTY4OTA4NjQ0MiwiYWlkIjoiOXBab09iakRTbjY3UDE0bUpOZWdMdyJ9.0jfA-Mq3zkGsmyPu8pb33NqLfeCwGbLgEr8CQcbA0k3MBOwyWKjXW9GDW4_1au1ARL6nYQPEOb8GcakEwhhUX"
	try {
		const response = await axios.get('http://localhost:3000/listMeetings', {
			params: {
				accessToken: accessToken,
			},
		});
		console.log(response.data);
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
		// window.location.href = '/';
	} catch (error) {
		console.error('Error creating meeting:', error);
	}
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
