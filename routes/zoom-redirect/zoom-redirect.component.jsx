import { useEffect } from 'react';
import axios from 'axios';
import { pullZoomData } from '../../utils/updateTask';
import { getUrlMeeting } from '../../utils/updateTask';
import { calculateMinuteDifference } from '../../utils/dateForZoom.utils';
const ZoomRedirect = () => {
	const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
	const timeStart = localStorage.getItem('timeStart') || null;
	const timeEnd = localStorage.getItem('timeEnd') || null;
	const conferenceDuration = calculateMinuteDifference(timeStart, timeEnd);
	console.log('renderTimeSt', timeStart);
	useEffect(() => {
		const getToken = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const authorizationCode = urlParams.get('code');
			if (authorizationCode) {
				axios
					.get('http://localhost:3000/exchangeCode', {
						params: {
							code: authorizationCode,
							conferenceTopic: conferenceTopic,
							timeStart: timeStart,
							conferenceDuration: conferenceDuration,
						},
					})
					.then((response) => {
						console.log(response.data);
					});
			}
		};
		getToken();
	}, []);

	return <h1>Перенаправление...</h1>;
};

export default ZoomRedirect;
