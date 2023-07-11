import { createContext, useState } from 'react';

export const ZoomContext = createContext({
	refreshToken: '',
	accessToken: '',
	setRefreshTokeb: () => {},
	setAccessToken: () => {},
});

export const ZoomProvider = ({ children }) => {
	const [refreshToken, setRefreshTokeb] = useState('');
	const [accessToken, setAccessToken] = useState('');

	const value = { refreshToken, setRefreshTokeb, accessToken, setAccessToken };
	return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};
