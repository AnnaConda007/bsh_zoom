import Calendar from '../../src/components/calendar/calendar.component';
import { listMeetUrl } from '../../contains';
import { getZoomToken } from '../../utils/zoom.utils';
import { useEffect } from 'react';
const CalendarPage = () => {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');
		console.log(authorizationCode);
		const createMeet = async () => {
			getZoomToken(listMeetUrl).then((token) => {
				const accessToken = token;
				console.log(accessToken);
			});
		};
		createMeet();
	}, []);

	return <Calendar />;
};

export default CalendarPage;
