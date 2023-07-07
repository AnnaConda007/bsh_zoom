import { useEffect } from 'react';
import axios from 'axios';
import { pullZoomData } from '../../utils/updateTask';
import { getUrlMeeting } from '../../utils/updateTask';
const ZoomRedirect = () => {
	const meetingDate = localStorage.getItem('meetingDate') || null;
	const meetingIndex = localStorage.getItem('meetingIndex') || null;

	useEffect(() => {
		const startZoomMeet = async () => {
			const urlMeeting = await getUrlMeeting(meetingDate, meetingIndex);
			if (urlMeeting) {
				console.log("was")
					window.location.href = urlMeeting;
			} else {
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
							console.log("new")
							pullZoomData(meetingDate, meetingIndex, startUrl);
						})
						.catch((error) => {
							console.error('Error exchanging code for token:', error);
						});
				}
			}
		};
		startZoomMeet();
	}, []);

	return <h1>Перенаправление...</h1>;
};

export default ZoomRedirect;
