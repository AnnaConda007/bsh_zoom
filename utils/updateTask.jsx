const dbUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';
let taskForDate;
let tasks;
let date;
export const pullTask = async (formattedDate) => {
	// сейчас нигде не вызывается
	const res = await fetch(dbUrl);
	const resJson = await res.json();
	tasks = resJson || {}; // Проверка наличия данных в базе
	date = formattedDate;
	taskForDate = tasks[date] || [];
	//	setTasks(taskForDate);
	return taskForDate;
};

export const pushTasks = async (updatedTasks) => {
	tasks[date] = updatedTasks;
	await fetch(dbUrl, {
		method: 'PUT',
		body: JSON.stringify(tasks),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
