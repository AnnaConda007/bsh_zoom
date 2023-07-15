import { createContext, useState } from 'react';

export const DisabledContext = createContext({
	disabledDate: '',
	SetDisabledDate: () => {},
	disabledTime: false,
	SetDisabledTime: () => {},
	disabledMessage: '',
	SetisabledMessage: () => {},
});

export const DisabledCProvider = ({ children }) => {
	const [disabledDate, SetDisabledDate] = useState('');
	const [disabledTime, SetDisabledTime] = useState(false);
	const [disabledMessage, SetisabledMessage] = useState('');
	const value = {
		disabledDate,
		SetDisabledDate,
		disabledTime,
		SetDisabledTime,
		disabledMessage,
		SetisabledMessage,
	};
	return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>;
};
