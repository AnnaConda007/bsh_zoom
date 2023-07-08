import { useEffect, useState } from 'react';
import axios from 'axios';
import { pullZoomData } from '../../utils/updateTask';
import { getUrlMeeting } from '../../utils/updateTask';
import { calculateMinuteDifference } from '../../utils/dateForZoom.utils';
const ZoomRedirect = () => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		const getToken = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const authorizationCode = urlParams.get('code');
			if (authorizationCode) {
				axios
					.get('http://localhost:3000/exchangeCode', {
						params: {
							code: authorizationCode,
						},
					})
					.then((response) => {
						setAccessToken(response.data.access_token);
					});
			}
		};
		getToken();
	}, []);

	useEffect(() => {
		if (accessToken) {
			const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
			const timeStart = localStorage.getItem('timeStart') || null;
			const timeEnd = localStorage.getItem('timeEnd') || null;
			const conferenceDuration = calculateMinuteDifference(timeStart, timeEnd);
			const token = accessToken;
			axios
				.get('http://localhost:3000/newConference', {
					params: {
						conferenceTopic: conferenceTopic,
						timeStart: timeStart,
						conferenceDuration: conferenceDuration,
						token: token,
					},
				})
				.then((response) => {
					console.log(response.data.meeting);
				});
		}
	}, [accessToken]);

	return <h1>Перенаправление...</h1>;
};

export default ZoomRedirect;
