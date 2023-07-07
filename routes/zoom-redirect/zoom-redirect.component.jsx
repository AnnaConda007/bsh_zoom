import { useEffect } from 'react';
import axios from 'axios';
import { pullZoomData } from '../../utils/updateTask';
import { getUrlMeeting } from '../../utils/updateTask';
const ZoomRedirect = () => {
	const meetingDate = localStorage.getItem('meetingDate') || null;
	const meetingIndex = localStorage.getItem('meetingIndex') || null;

	useEffect(() => {
		const getToken = async () => {
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
						console.log(response.data);
					});
			}
		};
		getToken();

 
	}, []);

	return <h1>Перенаправление...</h1>;
};

export default ZoomRedirect;
