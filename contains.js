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
export const token = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImMzZDI0YTI3LWY2ZTktNGQ0OS1iYTgwLTQ0Yjk3NmM0ODVjOCJ9.eyJ2ZXIiOjksImF1aWQiOiIwMWI4OGFmMjcyNmJiMTc3YmM3NGU0YWQ5ZTFjMzg0OCIsImNvZGUiOiJacEk1VE5yUFozVnhLUFVuTkdGUnY2UHZSOWtzb2RXWEEiLCJpc3MiOiJ6bTpjaWQ6d1lJTEVkM3RRbkNDazRDRTZKaWh4ZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJLOVBzYUZYM1RrT0k2cU5LcE5xOW53IiwibmJmIjoxNjg4OTg0MjkwLCJleHAiOjE2ODg5ODc4OTAsImlhdCI6MTY4ODk4NDI5MCwiYWlkIjoiOXBab09iakRTbjY3UDE0bUpOZWdMdyJ9.AO4gC9Kf8yeh47_HMrBzUa9Ms-PsmnbuVIWBYJUAmZS-EiKMuKuhnb6-x-NdvSlbS_hVYreiJxzVh6tm7lJZ3w"
