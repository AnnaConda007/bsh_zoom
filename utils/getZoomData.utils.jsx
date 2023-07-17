import axios from 'axios';
import { formatedDateFromUTStoDMY, formateTimeFromUTCtoHumanReadable } from './formatting.utils';
import { calculatTimeEnd } from './calculat.utils';

export const getZoomTokens = async (redirect) => {
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
	/*let accessToken =
		'eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImEyMjI0YjRlLWM5NzItNGM3MC05NTIxLThjODlhOWRhYTQ1MCJ9.eyJ2ZXIiOjksImF1aWQiOiIwMWI4OGFmMjcyNmJiMTc3YmM3NGU0YWQ5ZTFjMzg0OCIsImNvZGUiOiJibWxhWTBQeWhISkRFcExOY1dFUzNHWXVOaUNGdjFpVFEiLCJpc3MiOiJ6bTpjaWQ6d1lJTEVkM3RRbkNDazRDRTZKaWh4ZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJLOVBzYUZYM1RrT0k2cU5LcE5xOW53IiwibmJmIj oxNjg5MDg2NDQyLCJleHAiOjE2ODkwOTAwNDIsImlhdCI6MTY4OTA4NjQ0MiwiYWlkIjoiOXBab09iakRTbjY3UDE0bUpOZWdMdyJ9.0jfA-Mq3zkGsmyPu8pb33NqLfeCwGbLgEr8CQcbA0k3MBOwyWKjXW9GDW4_1au1ARL6nYQPEOb8GcakEwhhUX';*/

	let accessToken = localStorage.getItem('zoomAccesToken');
	const response = await axios.get('http://localhost:3000/listMeetings', {
		params: {
			accessToken: accessToken,
		},
	});
	return response.data;
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
		if (error.response && error.response.data.code === 124) {
			console.log('обновление токена');
			await updateAccesToken();
			return await getTaggedDate();
		} else {
			console.error('Ошибка при попытке получения ListMeeting:', error);
			throw error;
		}
	}
};

export const getConferenceInfo = async (selectedDate) => {
	const tasks = {};
	const conferenceData = await getListMeeting();
	const meetings = conferenceData.meetings;
	meetings.forEach((meeting) => {
		const timeStart = meeting.start_time;
		const duration = meeting.duration;
		const date = formatedDateFromUTStoDMY(timeStart);
		let topicObject;
		try {
			topicObject = JSON.parse(meeting.topic);
		} catch (error) {
			topicObject = { creator: 'не указан', value: meeting.topic };
		}
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
};
