import { useContext, useEffect } from 'react';
import axios from 'axios';
import { pullZoomData } from '../../utils/updateTask'; 
const ZoomRedirect = () => {
	const meetingDate = localStorage.getItem('meetingDate') || null;
	const meetingIndex = localStorage.getItem('meetingIndex') || null;

	useEffect(() => {
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
					const startUrl = response.data.meeting.start_url;
					 	window.location.href = startUrl;
 					 	pullZoomData(meetingDate,meetingIndex,startUrl);
				})
				.catch((error) => {
					console.error('Error exchanging code for token:', error);
				});
		}
	}, []);

	return <h1>Перенаправление...</h1>;
};

export default ZoomRedirect;
