const dataBaseUrl = 'https://test-f176b-default-rtdb.firebaseio.com';

let AlltasksForDay;
let selectedDate;

export const pullTask = async (formattedDate) => {
	const url = `${dataBaseUrl}/.json`;

	const res = await fetch(url);
	AlltasksForDay = await res.json();
	AlltasksForDay = AlltasksForDay ? AlltasksForDay : {};
	selectedDate = formattedDate;
	const taskForDate = AlltasksForDay[selectedDate] || [];
	return taskForDate;
};

export const getDayTask = async () => {
	const url = `${dataBaseUrl}/.json`;
	const res = await fetch(url);
	const resJson = await res.json();
	const datesArray = resJson ? Object.keys(resJson) : [];
	return datesArray;
};

export const pushTasks = async (updatedTasks) => {
	AlltasksForDay[selectedDate] = updatedTasks;
	const url = `${dataBaseUrl}/.json`;

	await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(AlltasksForDay),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
 
export const pullZoomData = async (formattedDate, index, newMeetingUrl) => {
 try {
	const url = `${dataBaseUrl}/${formattedDate}/${index}.json`;
		const response = await fetch( url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
 				meetingUrl: newMeetingUrl,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to update meeting URL in array');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error updating meeting URL in array:', error);
			}

};
 
