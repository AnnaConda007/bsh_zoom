import { useState, useEffect, useContext } from 'react';
import styles from './toDoBox.module.scss';
import AddNewTask from './addNewTask/addNewTask';
import AddedTasks from './addedTasks/addedTasks';
import { pullTask } from '../../../utils/updateTask';
import { ActiveDateContext } from '../../contexts/activeDateContext';
const ToDoBox = ({ dates, setDates }) => {
	const { activeDate, setActiveDate } = useContext(ActiveDateContext);
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
				<AddNewTask pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
				<AddedTasks pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
			</div>
		</>
	);
};

export default ToDoBox;
