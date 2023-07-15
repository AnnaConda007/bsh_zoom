import { useState, useEffect, useContext } from 'react';
import styles from './toDoBox.module.scss';
import AddNewTask from '../addNewTask/addNewTask';
import AddedTasks from '../addedTasks/addedTasks';
import { DatesContext } from '../../contexts/calendar.context';
import { getConferenceInfo } from '../../../utils/getZoomData.utils';
const ToDoBox = () => {
	const { activeDate } = useContext(DatesContext);
	const [pulledTasks, setPulledTasks] = useState([]);
	useEffect(() => {
		const fetchTasks = async () => {
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
