import { useState, useEffect } from 'react';
import styles from './toDoBox.module.scss';
import AddNewTask from './addNewTask/AddNewTask';
import AddedTasks from './addedTasks/addedTasks';
import { pullTask } from '../../../utils/updateTask';

const ToDoBox = ({ activeDate, dates, setDates }) => {
	const [pulledTasks, setPulledTasks] = useState([]);
	useEffect(() => {
		const fetchTasks = async () => {
			const taskForDate = await pullTask(activeDate);
			setPulledTasks(taskForDate);
		};
		fetchTasks();
	}, [activeDate]);

	return (
		<>
			<div className={styles.planner}>
				<AddNewTask
					activeDate={activeDate}
					pulledTasks={pulledTasks}
					setPulledTasks={setPulledTasks}
					dates={dates}
					setDates={setDates}
				/>
				<AddedTasks
					activeDate={activeDate}
					pulledTasks={pulledTasks}
					setPulledTasks={setPulledTasks}
					dates={dates}
					setDates={setDates}
				/>
			</div>
		</>
	);
};

export default ToDoBox;
