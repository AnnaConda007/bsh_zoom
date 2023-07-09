export const clientId = 'wYILEd3tQnCCk4CE6Jihxg';
export const clientSecret = 'nRPLBGGecg3O2VaUre8c6C7xPvJTboaZ';
export const NewMeetUrl = 'http://localhost:5173/createConference';
export const listMeetUrl = 'http://localhost:5173/calendar';
 export const authorizeNewMeetUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
	NewMeetUrl
)}`;
export const authorizeListMeetUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
	listMeetUrl
)}`;
