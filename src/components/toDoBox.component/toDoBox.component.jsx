import { useState, useEffect, useContext } from 'react';
import styles from './toDoBox.module.scss';
import AddNewTask from '../addNewTask/addNewTask';
import AddedTasks from '../addedTasks/addedTasks';
import { pullTask } from '../../../utils/updateTask';
import { DatesContext } from '../../contexts/calendar.context';
import { getConferenceInfo } from '../../../utils/getZoomData.utils';
const ToDoBox = () => {
	const { activeDate, setActiveDate } = useContext(DatesContext);
	const [pulledTasks, setPulledTasks] = useState([]);
	useEffect(() => {
		const fetchTasks = async () => {
			//	const taskForDate = await pullTask(activeDate);
			const task = await getConferenceInfo(activeDate);

			setPulledTasks(task);
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
