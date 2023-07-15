import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './addNewTask.module.scss';
import { DatesContext } from '../../contexts/dates.context';
import { redirectNewMeetUrl } from '../../../contains';
import { formatedDateToUTS } from '../../../utils/formatting.utils';
import { checkPastTime } from '../../../utils/currentTime.utils';
import { compareStartEndMeeting } from '../../../utils/calculat.utils';
import { createMeet } from '../../../utils/manageConference.utils';
import { DisabledContext } from '../../contexts/disabled.context';
const AddNewTask = ({ pulledTasks, setPulledTasks }) => {
	const defaultTask = { taskValue: '', timeStart: '', timeEnd: '', meetingUrl: '' };

	const [newTaskObj, setNewTaskObj] = useState(defaultTask);
	const { activeDate, taggedDates, setTaggedDates } = useContext(DatesContext);
	const { disabledDate, disabledTime, SetDisabledTime, SetisabledMessage } = useContext(DisabledContext);

	const fullnessTimeForNewTask = async (selectedTime, timeKey) => {
		const disabledTimeResponse = await checkPastTime(selectedTime, activeDate);
		SetDisabledTime(disabledTimeResponse);
		SetisabledMessage('Вы пытаетесь назаначить встречу на прошедшее время');

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

	const handleAddTaskBtn = async () => {
		const compareRes = compareStartEndMeeting(newTaskObj.timeStart.$d, newTaskObj.timeEnd.$d);
		SetDisabledTime(compareRes);
		SetisabledMessage('Время начала конференции позже времени окончания');
		if (disabledTime === true || compareRes === true) return;

		if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') return;
		const updatedTasks = [...pulledTasks];
		updatedTasks.push(newTaskObj);
		setPulledTasks(updatedTasks);
		setNewTaskObj(defaultTask);
		if (!taggedDates.includes(activeDate)) {
			setTaggedDates((prevDates) => [...prevDates, activeDate]);
		}
		await createMeet();
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
