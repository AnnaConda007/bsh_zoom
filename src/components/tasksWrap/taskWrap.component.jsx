import { useState, useEffect, useContext } from 'react';
import styles from './taskWrap.module.scss';
import AddNewTask from '../addNewTask/addNewTask';
import AddedTasks from '../addedTasks/addedTasks';
import { DatesContext } from '../../contexts/dates.context';
import { getConferenceInfo } from '../../../utils/getZoomData.utils';
import { Snackbar } from '@mui/material';
import { DisabledContext } from '../../contexts/disabled.context';
const ToDoBox = () => {
	const { activeDate } = useContext(DatesContext);
	const { disabledDate, disabledTime, disabledMessage, SetDisabledTime } = useContext(DisabledContext);

	const [pulledTasks, setPulledTasks] = useState([]);
	useEffect(() => {
		const getTask = async () => {
			const task = await getConferenceInfo(activeDate);
			setPulledTasks(task);
		};
		getTask();
	}, [activeDate]);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		SetDisabledTime(false);
	};

	return (
		<>
			<div className={styles.planner}>
				<div className={`${styles.date} ${disabledDate ? styles.datedisabledDate : ''}`}>
					{activeDate}
					<Snackbar
						open={disabledTime}
						onClose={handleSnackbarClose}
						autoHideDuration={4000}
						message={disabledMessage}
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
