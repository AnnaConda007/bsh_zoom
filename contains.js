export const clientId = 'wYILEd3tQnCCk4CE6Jihxg';
export const clientSecret = 'nRPLBGGecg3O2VaUre8c6C7xPvJTboaZ';
export const NewMeetUrl = 'http://localhost:5173/zoom';
export const redirectNewMeetUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
	NewMeetUrl
)}`;
export const homeUrL = 'http://localhost:5173/';
 export const redirectHomeUrL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
	homeUrL
)}`;




 