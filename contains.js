
export const clientId = 'wYILEd3tQnCCk4CE6Jihxg';
export const clientSecret = 'nRPLBGGecg3O2VaUre8c6C7xPvJTboaZ';
export const redirectUri = 'http://localhost:5173/zoom';
export const zoomTokenUrl = 'https://zoom.us/oauth/token';
export const authorizeUrlValue = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}`;