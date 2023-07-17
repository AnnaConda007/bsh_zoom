import { createContext, useState } from 'react';

export const TaskInfoContext = createContext({
	conferenceTopic: '',
	setConferenceTopic: () => {},
	timeStart: '',
	setTimeStart: () => {},
	timeEnd: '',
	setTimeStart: () => {},
});

export const TaskInfoProvider = ({ children }) => {
	const [conferenceTopic, setConferenceTopic] = useState('');
	const [timeStart, setTimeStart] = useState('');
	const [timeEnd, setTimeEnd] = useState('');

	const value = { conferenceTopic, setConferenceTopic, timeStart, setTimeStart, timeEnd, setTimeEnd };
	return <TaskInfoContext.Provider value={value}> {children} </TaskInfoContext.Provider>;
};
 