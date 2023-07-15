import axios from 'axios';
import { formatedDateFromUTStoDMY, formateTimeFromUTCtoHumanReadable } from './formatting.utils';
import { calculatTimeEnd } from './calculat.utils';

export const getZoomTokens = async (redirect) => {
	try {
		const urlParams = new URLSearchParams(window.location.search);
		const authorizationCode = urlParams.get('code');
		if (!localStorage.getItem('zoomRefreshToken')) {
			const response = await axios.get('http://localhost:3000/exchangeCode', {
				params: {
					code: authorizationCode,
					redirecturl: redirect,
				},
			});
			localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
			localStorage.setItem('zoomAccesToken', response.data.access_token);
			return response.data;
		}
	} catch (error) {
		console.error('Error retrieving refresh token:', error);
		throw error;
	}
};

export const updateAccesToken = async () => {
	const refreshToken = localStorage.getItem('zoomRefreshToken');
	const response = await axios.post('http://localhost:3000/refreshToken', {
		refreshToken: refreshToken,
	});
	localStorage.setItem('zoomRefreshToken', response.data.refresh_token);
	localStorage.setItem('zoomAccesToken', response.data.access_token);
	return response.data;
};

export const getListMeeting = async () => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	try {
		const response = await axios.get('http://localhost:3000/listMeetings', {
			params: {
				accessToken: accessToken,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error retrieving meetings:', error.response.data);

		throw error;
	}
};

export const getTaggedDate = async () => {
	try {
		const taggedDateArr = [];
		const conferenceData = await getListMeeting();
		const meetings = conferenceData.meetings;
		meetings.forEach((miting) => {
			const startTime = miting.start_time;
			const date = formatedDateFromUTStoDMY(startTime);
			if (!taggedDateArr.includes(date)) {
				taggedDateArr.push(date);
			}
		});
		return taggedDateArr;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('обработка ошибки');
			await updateAccesToken();
			console.log('updateAccesToken');
			return await getTaggedDate(); // Изменено: вызываем рекурсивно getTaggedDate() возвращая его результат
		} else {
			console.error('error while getting TaggedDate:', error.response.data);
			throw error; // Добавлено: выбрасываем ошибку для дальнейшей обработки
		}
	}
};

export const getConferenceInfo = async (selectedDate) => {
	try {
		const tasks = {};
		const conferenceData = await getListMeeting();
		const meetings = conferenceData.meetings;
		meetings.forEach((meeting) => {
			const timeStart = meeting.start_time;
			const duration = meeting.duration;
			const date = formatedDateFromUTStoDMY(timeStart);
			const topicObject = JSON.parse(meeting.topic);
			const task = {
				creator: topicObject.creator,
				taskValue: topicObject.value,
				timeStart: formateTimeFromUTCtoHumanReadable(timeStart),
				timeEnd: calculatTimeEnd(timeStart, duration),
				meetingUrl: meeting.join_url,
				meetingId: meeting.id,
			};
			if (tasks[date]) {
				tasks[date].push(task);
			} else {
				tasks[date] = [task];
			}
		});
		const tasksForDay = tasks[selectedDate] || [];
		return tasksForDay;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('прошел час ');
			await updateAccesToken();
			return await getConferenceInfo(selectedDate);
		} else {
			console.error('error while getting conference info:', error.response.data);
		}
	}
};
