const dataBaseUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';
let taskForDate;
let resJson;
let selectedDate;

export const pullTask = async (formattedDate) => {
	const res = await fetch(dataBaseUrl);
	resJson = await res.json();
	selectedDate =  formattedDate  
	taskForDate = resJson[selectedDate] || []; // маасив объектов для даты
	console.log(taskForDate);
	return taskForDate;
};

 export const getDayTask = async () => {
	const res = await fetch(dataBaseUrl);
	resJson = await res.json();
	const datesArray = resJson ? Object.keys(resJson) : [];
	return datesArray;
};

export const pushTasks = async (updatedTasks) => {
	resJson[selectedDate] = updatedTasks;
	await fetch(dataBaseUrl, {
		method: 'PUT',
		body: JSON.stringify(resJson),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
