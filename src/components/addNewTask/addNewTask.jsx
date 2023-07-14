import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './addNewTask.module.scss';
import { CalendarContext } from '../../contexts/calendar.context';
import { redirectNewMeetUrl } from '../../../contains';
import { formatedDateToUTS } from '../../../utils/formatting.utils';
import { checkPastTime } from '../../../utils/getTime.utils';
import { Snackbar } from '@mui/material';

const AddNewTask = ({ pulledTasks, setPulledTasks }) => {
	const defaultTask = { taskValue: '', timeStart: '', timeEnd: '', meetingUrl: '' };
	const [newTaskObj, setNewTaskObj] = useState(defaultTask);
	const { activeDate, taggedDates, setTaggedDates, disabledDate, disabledTime, SetDisabledTime } = useContext(
		CalendarContext
	);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const fullnessTimeForNewTask = async (selectedTime, timeKey) => {
		const disabledTimeResponse = await checkPastTime(selectedTime, activeDate);
		SetDisabledTime(disabledTimeResponse);
		setOpenSnackbar(disabledTimeResponse);

		setNewTaskObj((prevTask) => ({
			...prevTask,
			[timeKey]: selectedTime,
		}));
		const date = formatedDateToUTS(selectedTime, activeDate);
		localStorage.setItem(timeKey, date);
	};

	const fullnessValueForNewTask = (value) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			taskValue: value,
		}));
		localStorage.setItem('conferenceTopic', value);
	};

	const handleAddTaskBtn = () => { 
		if (disabledTime === true) return;
		if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') return;
		const updatedTasks = [...pulledTasks];
		updatedTasks.push(newTaskObj);
		setPulledTasks(updatedTasks);
		setNewTaskObj(defaultTask);
		if (!taggedDates.includes(activeDate)) {
			setTaggedDates((prevDates) => [...prevDates, activeDate]);
		}
		window.location.href = redirectNewMeetUrl;
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

				{disabledDate === false && (
					<button>
						<AddCircleOutlineIcon onClick={handleAddTaskBtn} />
					</button>
				)}
			</div>
		</>
	);
};

export default AddNewTask;
