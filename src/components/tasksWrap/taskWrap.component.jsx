import { useState, useEffect, useContext } from 'react';
import styles from './taskWrap.module.scss';
import AddNewTask from '../addNewTask/addNewTask';
import AddedTasks from '../addedTasks/addedTasks';
import { CalendarContext } from '../../contexts/calendar.context';
import { getConferenceInfo } from '../../../utils/manageConference.utils';
import { Snackbar } from '@mui/material';

const ToDoBox = () => {
	const { activeDate, disabledDate, disabledTime } = useContext(CalendarContext);
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
				<div className={`${styles.date} ${disabledDate ? styles.datedisabledDate : ''}`}>
					{activeDate}
					<Snackbar
						open={disabledTime}
						autoHideDuration={6000}
						message='Вы пытаетесь назаначить встречу на прошедшее время'
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					/>
				</div>
				<AddNewTask pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
				<AddedTasks pulledTasks={pulledTasks} setPulledTasks={setPulledTasks} />
			</div>
		</>
	);
};

export default ToDoBox;
