import { createContext, useState } from 'react';

export const DateMeetingContext = createContext({
	meetingDate: null,
	setMeetingDate: () => {},
});

export const DateMeetingProvider = ({ children }) => {
	const [meetingDate, setMeetingDate] = useState(null);
	const value = { meetingDate, setMeetingDate };
	return <DateMeetingContext.Provider value={value}> {children} </DateMeetingContext.Provider>;
};
