import { getListMeeting } from './zoom.utils';
import { formatedDateFromZoom, formateTimeFromZoom } from './formatting.utils';
import { calculatTimeEnd } from './calculat.utils';
import axios from 'axios';

export const getTaggedDate = async () => {
	const taggedDateArr = [];
	const conferenceData = await getListMeeting();
	const meetings = conferenceData.meetings;
	meetings.forEach((miting) => {
		const startTime = miting.start_time;
		const date = formatedDateFromZoom(startTime);
		if (!taggedDateArr.includes(date)) {
			taggedDateArr.push(date);
		}
	});
	return taggedDateArr;
};

export const getConferenceInfo = async (selectedDate) => {
	const tasks = {};
	const conferenceData = await getListMeeting();
	const meetings = conferenceData.meetings;
	console.log(meetings);
	meetings.forEach((meeting) => {
		const timeStart = meeting.start_time;
		const duration = meeting.duration;
		const date = formatedDateFromZoom(timeStart);
		const task = {
			taskValue: meeting.topic,
			timeStart: formateTimeFromZoom(timeStart),
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
export const updateConferenceInfo = async (idTopic, newData) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = idTopic;
	const data = newData;
	try {
		const response = await axios.patch('http://localhost:3000/updateConferenceInfo', {
			accessToken: accessToken,
			id: id,
			data: data,
		});
		return response.data;
	} catch (error) {
		console.error('Error retrieving meetings:', error); // добавить обновление токена
	}
};

export const deleteConference = async (conferenceId) => {
	let accessToken = localStorage.getItem('zoomAccesToken');
	const id = conferenceId;
	try {
		const response = await axios.delete('http://localhost:3000/deleteConference', {
			data: {
				accessToken: accessToken,
				id: id,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		// Обработка ошибки
	}
};
