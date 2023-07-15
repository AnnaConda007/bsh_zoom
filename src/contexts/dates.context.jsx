import { createContext, useState } from 'react';

export const DatesContext = createContext({
	activeDate: '',
	setActiveDate: () => {},
	taggedDates: [],
	setTaggedDates: () => {},
});

export const DatesProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	const [taggedDates, setTaggedDates] = useState([]);

	const value = {
		activeDate,
		setActiveDate,
		taggedDates,
		setTaggedDates,
	};
	return <DatesContext.Provider value={value}>{children}</DatesContext.Provider>;
};
