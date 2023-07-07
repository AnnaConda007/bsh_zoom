import { createContext, useState } from 'react';

export const IndexTaskMeetingContext = createContext({
	indexTaskMeet: null,
	setIndexTaskMeet: () => {},
});

export const IndexTaskMeetingProvider = ({ children }) => {
	const [indexTaskMeet, setIndexTaskMeet] = useState(null);
	const value = { indexTaskMeet, setIndexTaskMeet };
	return <IndexTaskMeetingContext.Provider value={value}> {children} </IndexTaskMeetingContext.Provider>;
};
