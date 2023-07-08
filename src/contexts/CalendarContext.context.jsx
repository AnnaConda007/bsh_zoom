import { createContext, useState } from 'react';

export const CalendarContext = createContext({
	activeDate: '',
	setActiveDate: () => {},
	taggedDates: [],
	setTaggedDates: () => {},
});

export const CalendarProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	const [taggedDates, setTaggedDates] = useState([]);
	const value = { activeDate, setActiveDate, taggedDates, setTaggedDates };
	return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
