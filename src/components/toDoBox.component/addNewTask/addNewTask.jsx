import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useContext } from 'react';
import { pushTasks } from '../../../../utils/updateTask';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './addNewTask.module.scss';
import { ActiveDateContext } from '../../../contexts/activeDateContext';
import { TaggetDatesContext } from '../../../contexts/taggedDates';

const AddNewTask = ({ pulledTasks, setPulledTasks }) => {
	const defaultTask = { taskValue: '', timeStart: '', timeEnd: '', meetingUrl: '' };
	const [newTaskObj, setNewTaskObj] = useState(defaultTask);
	const { activeDate, setActiveDate } = useContext(ActiveDateContext);
	const { dates, setDates } = useContext(TaggetDatesContext);

	const fullnessTimeForNewTask = (selectedTime, timeKey) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			[timeKey]: selectedTime,
		}));
	};

	const fullnessValueForNewTask = (value) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			taskValue: value,
		}));
	};

	const handleAddTaskBtn = () => {
		if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') return;
		const updatedTasks = [...pulledTasks];
		updatedTasks.push(newTaskObj);
		setPulledTasks(updatedTasks);
		pushTasks(updatedTasks);
		setNewTaskObj(defaultTask);

		if (!dates.includes(activeDate)) {
			setDates((prevDates) => [...prevDates, activeDate]);
		}
	};

	return (
		<>
			<div className={styles.newTask}>
				<TextField
					sx={{ border: '1px solid', borderRadius: '5px' }}
					className={styles.newTask__textField}
					multiline={true}
					onChange={(e) => {
						fullnessValueForNewTask(e.target.value);
					}}
					value={newTaskObj.taskValue}
					InputProps={{
						endAdornment: (
							<div className={styles.newTask__time}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<TimePicker
										label='начало'
										ampm={false}
										value={newTaskObj.timeStart}
										onChange={(time) => {
											fullnessTimeForNewTask(time, 'timeStart');
										}}
									/>
									<TimePicker
										label='конец'
										value={newTaskObj.timeEnd}
										ampm={false}
										onChange={(time) => {
											fullnessTimeForNewTask(time, 'timeEnd');
										}}
									/>
								</LocalizationProvider>
							</div>
						),
					}}
				/>
				<button>
					<AddCircleOutlineIcon onClick={handleAddTaskBtn} />
				</button>
			</div>
		</>
	);
};

export default AddNewTask;
