import { createContext, useState } from 'react';

export const CalendarContext = createContext({
	activeDate: '',
	setActiveDate: () => {},
	taggedDates: [],
	setTaggedDates: () => {},
	AlltasksForDay: '',
	setAlltasksForDay: () => {},
});

export const CalendarProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	const [taggedDates, setTaggedDates] = useState([]);
	const [AlltasksForDay, setAlltasksForDay] = useState('');
 	const value = { activeDate, setActiveDate, taggedDates, setTaggedDates, AlltasksForDay, setAlltasksForDay };
	return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
