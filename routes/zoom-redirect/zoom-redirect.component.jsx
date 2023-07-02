import { useEffect } from 'react';
import axios from 'axios';

const ZoomRedirect = () => {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');

		if (authorizationCode) {
			console.log(authorizationCode); // +++

			axios
				.get('http://localhost:3000/exchangeCode', {
					params: {
						code: authorizationCode,
					},
				})
				.then((response) => {
					console.log('Access token:', response.data.access_token);
				})
				.catch((error) => {
					console.error('Error exchanging code for token:', error);
				});
		}
	}, []);

	return <h1>zoom zoom</h1>;
};

export default ZoomRedirect;
