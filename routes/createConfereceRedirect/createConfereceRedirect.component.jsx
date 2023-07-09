import { useEffect } from 'react';
import { createMeet } from '../../utils/zoom.utils';
const ZoomRedirect = () => {
	useEffect(() => {
		createMeet();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default ZoomRedirect;
