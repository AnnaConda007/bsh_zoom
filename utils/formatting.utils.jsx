import { DateTime } from 'luxon';
import getfixAuthorizationTime from './getTime.utils';

export const formatedDateForZoom = (selectedTime, activeDate) => {
	const timeObj = new Date(selectedTime);
	const dateSegments = activeDate.split('-').reverse();
	const dateObj = new Date(dateSegments.join('-'));
	const year = dateObj.getFullYear();
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObj.getDate().toString().padStart(2, '0');
	const hours = timeObj.getHours().toString().padStart(2, '0');
	const minutes = timeObj.getMinutes().toString().padStart(2, '0');
	const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
	return iso8601Date;
};

export const formatedDateFromZoom = (dateStr) => {
	let date = new Date(dateStr);
	let formattedDate =
		('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
	return formattedDate;
};

export const formateTimeFromZoom = (time) => {
	const inputDate = time;
	const date = new Date(inputDate);
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const dayOfWeek = daysOfWeek[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();
	const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours
		.toString()
		.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')} GMT+0400 (Грузия, стандартное время)`;
	return formattedDate;
};

const toUnix = (string) => {
	const dateString = DateTime.fromFormat(string, 'dd-MM-yyyy');
	const unixTimestamp = dateString.toSeconds();
	return unixTimestamp;
};

export const checkPastDate = async (activeDate) => {
	const todaySecond = await getfixAuthorizationTime();
	const dateTime = DateTime.fromSeconds(todaySecond);
	const todayString = dateTime.toFormat('dd-MM-yyyy');
	toUnix(todayString);
	toUnix(activeDate);
	if (todayString > activeDate) {
		return true;
	} else {
		return false;
	}
};

/*


const dateTime = DateTime.fromFormat(dateString, 'dd-MM-yyyy');
  
  const unixTimestamp = dateTime.toSeconds();*/
