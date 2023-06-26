import { createContext, useState } from 'react';
 
export const PulledTaskContext = createContext();
export const PulledTaskProvider = ({ children }) => {
	const [activeDate, setActiveDate] = useState('');
	return <PulledTaskContext.Provider value={{ activeDate, setActiveDate }}>{children}</PulledTaskContext.Provider>;
};
