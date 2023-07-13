import { useState, useEffect, useContext } from 'react';
import styles from './taskWrap.module.scss';
import AddNewTask from '../addNewTask/addNewTask';
import AddedTasks from '../addedTasks/addedTasks';
import { CalendarContext } from '../../contexts/calendar.context';
import { getConferenceInfo } from '../../../utils/manageConference.utils';
const ToDoBox = () => {
	const { activeDate, disabled } = useContext(CalendarContext);
	const [pulledTasks, setPulledTasks] = useState([]);
	useEffect(() => {
		const getTask = async () => {
			const task = await getConferenceInfo(activeDate);
			setPulledTasks(task);
		};
		getTask();
	}, [activeDate]);

	return (
		<>
			<div className={styles.planner}>
				<div className={`${styles.date} ${disabled ? styles.dateDisabled : ''}`}>{activeDate}</div>
				<AddNewTask pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
				<AddedTasks pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
			</div>
		</>
	);
};

export default ToDoBox;
