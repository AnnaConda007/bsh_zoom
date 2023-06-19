const dataBaseUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';
let taskForDate;
let allTasks;
let selectedDate;

export const pullTask = async (formattedDate) => {
	const res = await fetch(dataBaseUrl);
	const resJson = await res.json();
	allTasks = resJson || {};
	selectedDate = formattedDate;
	taskForDate = allTasks[selectedDate] || [];
	return taskForDate;
};

export const pushTasks = async (updatedTasks) => {
	allTasks[selectedDate] = updatedTasks;
	await fetch(dataBaseUrl, {
		method: 'PUT',
		body: JSON.stringify(allTasks),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
