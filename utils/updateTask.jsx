const dbUrl = 'https://test-f176b-default-rtdb.firebaseio.com/.json';
export const pullTask = async (formattedDate) => {
	// сейчас нигде не вызывается
	const res = await fetch(dbUrl);
	const resJson = await res.json();
	const tasks = resJson ? resJson : [];

	const date = formattedDate;
//	console.log(formattedDate);
	const taskForDate = tasks[date] || [];
	//	setTasks(taskForDate);
//	console.log(taskForDate);
	return taskForDate;
};
export const pushTasks = async (updatedTasks) => {
	await fetch(dbUrl, {
		method: 'PUT',
		body: JSON.stringify(updatedTasks),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
