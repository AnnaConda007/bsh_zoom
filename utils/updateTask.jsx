const dataBaseUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';
let taskForDate;
let resJson;
let selectedDate;

export const pullTask = async (formattedDate) => {
	const res = await fetch(dataBaseUrl);
	resJson = await res.json(); //весь объект
	selectedDate = formattedDate ? formattedDate : [];
	taskForDate = resJson[selectedDate] || []; // маасив объектов для даты
	const datesArray = Object.keys(resJson);
	console.log(taskForDate);
	return { taskForDate, datesArray };
};

export const pushTasks = async (updatedTasks) => {
	allTasks[selectedDate] = updatedTasks;
	await fetch(dataBaseUrl, {
		method: 'PUT',
		body: JSON.stringify(resJson),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
