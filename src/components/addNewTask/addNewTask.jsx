import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './addNewTask.module.scss';
import { formatedDateToUTS } from '../../../utils/formatting.utils';
import { checkPastTime } from '../../../utils/currentTime.utils';
import { compareStartEndMeeting } from '../../../utils/calculat.utils';
import { createMeet } from '../../../utils/manageConference.utils';
import { DisabledContext } from '../../contexts/disabled.context';
import { DatesContext } from '../../contexts/dates.context';
import { TaskInfoContext } from '../../contexts/taskInfo.context';
import { errorMessageForCompareErrorTime, errorMessageForPastTimeError } from '../../../contains';
const AddNewTask = ({ pulledTasks, setPulledTasks }) => {
	const defaultTask = { taskValue: '', timeStart: '', timeEnd: '', meetingUrl: '' };
	const [newTaskObj, setNewTaskObj] = useState(defaultTask);
	const { activeDate, taggedDates, setTaggedDates } = useContext(DatesContext);
	const { disabledDate, errorExsist, SetErrorExsist, SetErrorMessage } = useContext(DisabledContext);
	const { conferenceTopic, setConferenceTopic, timeStart, setTimeStart, timeEnd, setTimeEnd } = useContext(
		TaskInfoContext
	);
	const fullnessTimeForNewTask = async (selectedTime, timeKey) => {
		const errorExsistResponse = await checkPastTime(selectedTime, activeDate);
		SetErrorExsist(errorExsistResponse);
		SetErrorMessage(errorMessageForPastTimeError);
		setNewTaskObj((prevTask) => ({
			...prevTask,
			[timeKey]: selectedTime,
		}));
		const date = formatedDateToUTS(selectedTime, activeDate);
		if (timeKey === 'timeStart') {
			setTimeStart(date);
		}
		if (timeKey === 'timeEnd') {
			setTimeEnd(date);
		}
	};

	const fullnessValueForNewTask = (value) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			taskValue: value,
		}));
		setConferenceTopic(value);
	};

	const handleAddTaskBtn = async () => {
		const compareRes = compareStartEndMeeting(newTaskObj.timeStart.$d, newTaskObj.timeEnd.$d);
		SetErrorExsist(compareRes);
		SetErrorMessage(errorMessageForCompareErrorTime);
		if (errorExsist === true || compareRes === true) return;
		if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') return;
		await createMeet(SetErrorExsist, SetErrorMessage, conferenceTopic, timeStart, timeEnd);
		const updatedTasks = [...pulledTasks];
		updatedTasks.push(newTaskObj);
		setPulledTasks(updatedTasks);
		setNewTaskObj(defaultTask);
		if (!taggedDates.includes(activeDate)) {
			setTaggedDates((prevDates) => [...prevDates, activeDate]);
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
