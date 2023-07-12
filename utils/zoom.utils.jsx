import axios from 'axios';

export const getZoomToken = async (redirect) => {
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
			console.log(response.data.refresh_token);
			console.log(response.data.access_token);
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
	console.log(
		'новые токены:',
		'zoomAccesToken',
		response.data.refresh_token,
		'zoomRefreshToken',
		response.data.access_token
	);
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
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const updatedTokenData = await updateAccesToken();
			accessToken = updatedTokenData.access_token;
			await getListMeeting();
		} else {
			console.error('Error retrieving meetings:', error.response.data);
			throw error;
		}
	}
};

export const createMeet = async () => {
	try {
		let accessToken = localStorage.getItem('zoomAccesToken');
		const conferenceTopic = localStorage.getItem('conferenceTopic') || null;
		const timeStart = localStorage.getItem('timeStart') || null;
		const timeEnd = localStorage.getItem('timeEnd') || null;
		const conferenceDuration = calculateMinuteDifference(timeStart, timeEnd);
		const response = await axios.get('http://localhost:3000/newConference', {
			params: {
				conferenceTopic: conferenceTopic,
				timeStart: timeStart,
				conferenceDuration: conferenceDuration,
				token: accessToken,
			},
		});
		console.log(response.data.meeting);
		// window.location.href = '/';
	} catch (error) {
		console.error('Error creating meeting:', error); //!!!!!!! добавь обновление токенво
	}
};

export const formatedDataForZoom = (selectedTime, activeDate) => {
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
export const formatedDataFromZoom = (dateStr) => {
	let date = new Date(dateStr);
	let formattedDate =
		('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
	return formattedDate;
};

export const formateTimeFromZoom = (time) => {
	const startTime = time;
	const date = new Date(startTime);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');
	const seconds = String(date.getUTCSeconds()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.248Z`;
	return formattedDate;
};

export const calculatTimeEnd = (time, durationTime) => {
	const startTime = time;
	const duration = durationTime;
	const startDate = new Date(startTime);
	startDate.setMinutes(startDate.getMinutes() + duration);
	const endTime = startDate.toISOString();
	const formatedTime = formateTimeFromZoom(endTime);
	return formatedTime;
};

export const calculateMinuteDifference = (date1, date2) => {
	const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	return minutes;
};

export const getTaggedDate = async () => {
	const taggedDateArr = [];
	const conferenceData = await getListMeeting();
	const meetings = conferenceData.meetings;
	meetings.forEach((miting) => {
		const startTime = miting.start_time;
		const date = formatedDataFromZoom(startTime);
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
	meetings.forEach((meeting) => {
		const time = meeting.start_time;
		const duration = meeting.duration;
		const date = formatedDataFromZoom(time);
		const task = {
			taskValue: meeting.topic,
			timeStart: formateTimeFromZoom(meeting.start_time),
			timeEnd: calculatTimeEnd(time, duration),
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
	console.log(tasks);
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
		console.log('ответ', response.data);
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
        'Content-Type': 'application/json'
      },
    });
    console.log('ответ', response.data);
    return response.data;
  } catch (error) {
    // Обработка ошибки
  }
};

