import { useEffect } from 'react';
import { createMeet } from '../../utils/zoom.utils';
import { getConferenceInfo } from '../../utils/manageConference.utils';
import { CalendarContext } from '../../src/contexts/calendar.context';
import { useContext } from 'react';
const CreateConferenceRedirect = () => {
	const { activeDate, setActiveDate } = useContext(CalendarContext);

	useEffect(() => {
		createMeet();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default CreateConferenceRedirect;
