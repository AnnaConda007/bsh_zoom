import { useEffect } from 'react';
import Calendar from '../../src/components/calendar/calendar.component';
import { useNavigate } from 'react-router';

const CalendarPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const navigationType = performance.getEntriesByType('navigation')[0]?.type;
		if (navigationType === 'reload' || navigationType === 'back_forward') {
			navigate('/');
		}
	}, []);

	return <Calendar />;
};

export default CalendarPage;
