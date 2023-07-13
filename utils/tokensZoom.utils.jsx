import axios from 'axios';
export const getZoomTokens = async (redirect) => {
	try {
		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');
		if (!localStorage.getItem('zoomRefreshToken')) {
			const response = await axios.get('http://localhost:3000/exchangeCode', {
				params: {
					code: authorizationCode,
					redirecturl: redirect,
				},
			});
			localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
			localStorage.setItem('zoomAccesToken', response.data.access_token);
			return response.data;
		}
	} catch (error) {
		console.error('Error retrieving refresh token:', error);
		throw error;
	}
};

export const updateAccesToken = async () => {
	const refreshToken = localStorage.getItem('zoomRefreshToken');
	const response = await axios.post('http://localhost:3000/refreshToken', {
		refreshToken: refreshToken,
	});
	localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
	localStorage.setItem('zoomAccesToken', response.data.access_token);
	console.log(
		'новые токены:',
		'zoomAccesToken',
		response.data.refresh_token,
		'zoomRefreshToken',
		response.data.access_token
	);
	return response.data;
};
