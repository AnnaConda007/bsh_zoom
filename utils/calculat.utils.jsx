import { formateTimeFromUTCtoHumanReadable } from './formatting.utils';
export const calculatTimeEnd = (time, durationTime) => {
	const startTime = time;
	const duration = durationTime;
	const startDate = new Date(startTime);
	startDate.setMinutes(startDate.getMinutes() + duration);
	const endTime = startDate.toISOString();
	const formatedTimeEnd = formateTimeFromUTCtoHumanReadable(endTime);
	return formatedTimeEnd;
};

export const calculateDuration = (date1, date2) => {
	const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	return minutes;
};
