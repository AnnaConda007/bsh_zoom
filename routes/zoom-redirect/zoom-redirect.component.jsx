import { useEffect } from 'react';

const ZoomRedirect = () => {
	useEffect(() => {
		const clientId = 'wYILEd3tQnCCk4CE6Jihxg';
		const clientSecret = 'NNbxQM8o1zvN6S7GWLobx1u4u0hztbCB';
		const redirectUri = 'http://localhost:5173/zoom';
		const zoomTokenUrl = 'https://zoom.us/oauth/token';

		const exchangeCodeForToken = async (code) => {
			const params = new URLSearchParams();
			params.append('grant_type', 'authorization_code');
			params.append('code', code);
			params.append('redirect_uri', redirectUri);

			const headers = new Headers();
			headers.append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
			headers.append('Content-Type', 'application/x-www-form-urlencoded');

			const requestOptions = {
				method: 'POST',
				headers: headers,
				body: params,
				redirect: 'follow',
			};

			try {
				const response = await fetch(zoomTokenUrl, requestOptions);

				if (!response.ok) {
					throw new Error('Failed to exchange code for access token');
				}

				const data = await response.json();
				return data.access_token;
			} catch (error) {
				console.error('Error exchanging code for access token:', error);
				throw new Error('Failed to exchange code for access token');
			}
		};

		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');
		if (authorizationCode) {
			exchangeCodeForToken(authorizationCode)
				.then((accessToken) => {
					console.log('Access token:', accessToken);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	}, []);

	return <h1>zoom zoom</h1>;
};

export default ZoomRedirect;
