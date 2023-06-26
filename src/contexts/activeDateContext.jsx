import { createContext, useState } from 'react';

export const ActiveDateContext = createContext();

export const ActiveDateProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	return <ActiveDateContext.Provider value={{ activeDate, setActiveDate }}>{children}</ActiveDateContext.Provider>;
};           