import moment from 'moment';
const getfixAuthorizationTime = async () => {
	let currentTime;
	try {
		const response = await fetch('http://worldtimeapi.org/api/timezone/Russia/Moscow');
		const data = await response.json();
		const dateTime = moment(data.datetime);
		const timestamp = Math.floor(dateTime.valueOf() / 1000);
		currentTime = timestamp || Math.floor(Date.now() / 1000);
	} catch (error) {
		console.error('Ошибка при обращении к API,опредяляющему точное время :', error);
	}
	return currentTime;
};
export default getfixAuthorizationTime;
