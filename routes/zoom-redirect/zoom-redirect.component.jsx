import { useEffect } from 'react';
import axios from 'axios';
import { calculateMinuteDifference } from '../../utils/zoom.utils';
import { getZoomToken } from '../../utils/zoom.utils';
import { NewMeetUrl } from '../../contains';
import { createMeet } from '../../utils/zoom.utils';
const ZoomRedirect = () => {
	useEffect(() => {
	
		createMeet();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default ZoomRedirect;
