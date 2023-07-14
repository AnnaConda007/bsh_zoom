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
	disabledTime: false,
	SetDisabledTime: () => {},
	nonCorrectTime: false,
	SetDisabledTime: () => {},
	disabledMessage: '',
	SetisabledMessage: () => {},
});

export const CalendarProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	const [taggedDates, setTaggedDates] = useState([]);
	const [AlltasksForDay, setAlltasksForDay] = useState('');
	const [disabledDate, SetDisabledDate] = useState('');
	const [nonCorrectTime, SetNonCorrectTime] = useState(false);
	const [disabledTime, SetDisabledTime] = useState(false);
	const [disabledMessage, SetisabledMessage] = useState('');
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
		nonCorrectTime,
		SetNonCorrectTime,
		disabledMessage,
		SetisabledMessage,
	};
	return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
