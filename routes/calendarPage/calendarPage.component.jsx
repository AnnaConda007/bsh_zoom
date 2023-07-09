import { useEffect } from 'react';
import Calendar from '../../src/components/calendar/calendar.component';
import { authorizeListMeetUrl } from '../../contains';
const CalendarPage = () => {
	useEffect(() => {
		const navigationType = performance.getEntriesByType('navigation')[0]?.type;
		if (navigationType === 'reload' || navigationType === 'back_forward') {
			window.location.href = authorizeListMeetUrl;
		}
	}, []);

	return <Calendar />;
};

export default CalendarPage;
