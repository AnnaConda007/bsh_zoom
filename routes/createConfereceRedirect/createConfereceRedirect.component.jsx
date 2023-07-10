import { useEffect } from 'react';
import { createMeet, getListMeet } from '../../utils/zoom.utils';
const ZoomRedirect = () => {
	useEffect(() => {
		const asyncfun = async () => {
		await	createMeet();
			getListMeet();
		};
		asyncfun();
	}, []);

	return <h1>Создание новой конференции zoom...</h1>;
};

export default ZoomRedirect;
