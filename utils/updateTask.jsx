const dataBaseUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';

let AlltasksForDay;
let selectedDate;

export const pullTask = async (formattedDate) => {
	const res = await fetch(dataBaseUrl);
	AlltasksForDay = await res.json();
	AlltasksForDay = AlltasksForDay ? AlltasksForDay : {};
	selectedDate = formattedDate;
	const taskForDate = AlltasksForDay[selectedDate] || []; 
	return taskForDate;
};

export const getDayTask = async () => {
	const res = await fetch(dataBaseUrl);
	const resJson = await res.json();
	const datesArray = resJson ? Object.keys(resJson) : [];
	return datesArray;
};

export const pushTasks = async (updatedTasks) => {
	AlltasksForDay[selectedDate] = updatedTasks;
	await fetch(dataBaseUrl, {
		method: 'PUT',
		body: JSON.stringify(AlltasksForDay),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
