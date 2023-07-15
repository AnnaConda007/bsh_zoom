import { createContext, useState } from 'react';

export const DisabledContext = createContext({
	disabledDate: '',
	SetDisabledDate: () => {},
	disabledTime: false,
	SetDisabledTime: () => {},
	nonCorrectTime: false,
	SetDisabledTime: () => {},
	disabledMessage: '',
	SetisabledMessage: () => {},
});

export const DisabledCProvider = ({ children }) => {
	const [disabledDate, SetDisabledDate] = useState('');
	const [nonCorrectTime, SetNonCorrectTime] = useState(false);
	const [disabledTime, SetDisabledTime] = useState(false);
	const [disabledMessage, SetisabledMessage] = useState('');
	const value = {
		disabledDate,
		SetDisabledDate,
		disabledTime,
		SetDisabledTime,
		nonCorrectTime,
		SetNonCorrectTime,
		disabledMessage,
		SetisabledMessage,
	};
	return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>;
};
