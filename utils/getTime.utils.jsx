import { DateTime } from 'luxon';

const getfixAuthorizationTime = async () => {
	let currentTime;
	try {
		const response = await fetch('http://worldtimeapi.org/api/timezone/Russia/Moscow');
		const data = await response.json();
		const dateTime = DateTime.fromISO(data.datetime);
		const timestamp = Math.floor(dateTime.toSeconds());
		currentTime = timestamp || Math.floor(DateTime.local().toSeconds());
	} catch (error) {
		console.error('Ошибка при обращении к API,опредяляющему точное время :', error);
	}
	return currentTime;
};
export default getfixAuthorizationTime;
