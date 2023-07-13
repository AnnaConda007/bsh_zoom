import { getListMeeting } from './zoom.utils';
import { formatedDateFromZoom, formateTimeFromZoom } from './formatting.utils';
import { calculatTimeEnd } from './calculat.utils';
import { updateAccesToken } from './tokensZoom.utils';
import axios from 'axios';

export const getTaggedDate = async () => {
	try {
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
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('прошел час ');
			await updateAccesToken();
			await getTaggedDate();
		} else {
			console.error('error while getting TaggedDate:', error.response.data);
		}
	}
};

export const getConferenceInfo = async (selectedDate) => {
	try {
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
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('прошел час ');
			await updateAccesToken();
			await getConferenceInfo(selectedDate);
		} else {
			console.error('error while getting conference info:', error.response.data);
		}
	}
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
		if (error.response && error.response.status === 401) {
			await updateAccesToken();
			await updateConferenceInfo(idTopic, newData);
		}
		console.error('Error update meetings:', error);
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
		if (error.response && error.response.status === 401) {
			console.log('прошел час ');
			await updateAccesToken();
			await deleteConference(conferenceId);
		}
		console.error('Error delete meetings:', error);
	}
};
