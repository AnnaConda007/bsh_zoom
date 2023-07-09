import { useEffect } from 'react';
import axios from 'axios';
import { calculateMinuteDifference } from '../../utils/zoom.utils';
import { getZoomToken } from '../../utils/zoom.utils';
import { NewMeetUrl } from '../../contains';
const ZoomRedirect = () => {
	useEffect(() => {
		const createMeet = async () => {
			getZoomToken(NewMeetUrl).then((token) => {
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
					});
			});
			//		window.location.href = '/';
		};
		createMeet();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default ZoomRedirect;
