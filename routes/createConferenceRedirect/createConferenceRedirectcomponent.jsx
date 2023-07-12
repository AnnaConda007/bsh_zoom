import { useEffect } from 'react';
import { createMeet } from '../../utils/zoom.utils';
import { getConferenceInfo } from '../../utils/zoom.utils';
import { CalendarContext } from '../../src/contexts/CalendarContext.context';
import { useContext } from 'react';
const CreateConferenceRedirect = () => {
	const { activeDate, setActiveDate } = useContext(CalendarContext);

	useEffect(() => {
		createMeet();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default CreateConferenceRedirect;
