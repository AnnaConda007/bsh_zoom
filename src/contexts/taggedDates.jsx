import { createContext, useState } from 'react';

export const TaggetDatesContext = createContext();
export const TaggetDatesProvider = ({ children }) => {
	const [dates, setDates] = useState([]);  
	return <TaggetDatesContext.Provider value={{ dates, setDates }}>{children}</TaggetDatesContext.Provider>;
};
