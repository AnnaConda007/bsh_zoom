import { createContext, useState } from 'react';

export const ZoomTokenContext = createContext({
	zoomToken: null,
	setZoomToken: () => {},
});

export const ZoomTokenProvider = ({ children }) => {
	const [zoomToken, setZoomToken] = useState(null);
	const value = { zoomToken, setZoomToken };
	return <ZoomTokenContext.Provider value={value}> {children} </ZoomTokenContext.Provider>;
};
