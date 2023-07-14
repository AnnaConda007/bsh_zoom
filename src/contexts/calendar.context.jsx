import { createContext, useState } from 'react';

export const CalendarContext = createContext({
	activeDate: '',
	setActiveDate: () => {},
	taggedDates: [],
	setTaggedDates: () => {},
	AlltasksForDay: '',
	setAlltasksForDay: () => {},
	disabledDate: '',
	SetDisabledDate: () => {},
	disabledTime: '',
	SetDisabledTime: () => {},
});

export const CalendarProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	const [taggedDates, setTaggedDates] = useState([]);
	const [AlltasksForDay, setAlltasksForDay] = useState('');
	const [disabledDate, SetDisabledDate] = useState('');
	const [disabledTime, SetDisabledTime] = useState('');
	const value = {
		activeDate,
		setActiveDate,
		taggedDates,
		setTaggedDates,
		AlltasksForDay,
		setAlltasksForDay,
		disabledDate,
		SetDisabledDate,
		disabledTime,
		SetDisabledTime,
	};
	return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
