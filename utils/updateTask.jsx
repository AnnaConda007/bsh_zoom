export const pullTask = async (setTasks) => {
	const res = await fetch('https://test-f176b-default-rtdb.firebaseio.com/tasks/.json');
	const resJson = await res.json();
	const tasks = resJson ? resJson : [];
	setTasks(tasks);
};
export const pushTasks = async (updatedTasks) => {
	await fetch('https://test-f176b-default-rtdb.firebaseio.com/tasks/.json', {
		method: 'PUT',
		body: JSON.stringify(updatedTasks),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
