import { pushTasks } from '../../../../utils/updateTask';
import { TextField, FormControl } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import styles from './addedTasks.module.scss';
import { CalendarContext } from '../../../contexts/CalendarContext.context';
import {
	updateConferenceInfo,
	formatedDataForZoom,
	calculateMinuteDifference,
	deleteConference,
} from '../../../../utils/zoom.utils';


const AddedTasks = ({ pulledTasks, setPulledTasks }) => {
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');
	const { activeDate, setTaggedDates } = useContext(CalendarContext);

	const upDateStartTimeFor = (timeStart, index) => {
		const duration = calculateMinuteDifference(timeStart, pulledTasks[index].timeEnd);
		const id = pulledTasks[index].meetingId;
		const newStartTimeValue = {
			duration: duration,
			start_time: formatedDataForZoom(timeStart, activeDate),
		};
		updateConferenceInfo(id, newStartTimeValue);
	};

	const handleEditBtn = (index) => {
		setisEditingIndex(index);
		setEditingValue(pulledTasks[index].taskValue);
	};

	const handleTaskInputChange = (newValue) => {
		setEditingValue(newValue);
	};

	const handleSaveEdit = (index) => {
		const updatedTasks = [...pulledTasks];
		updatedTasks[index].taskValue = editingValue;
		const id = updatedTasks[index].meetingId;
		const newTopicValue = {
			topic: editingValue,
		};
		updateConferenceInfo(id, newTopicValue);
		setPulledTasks(updatedTasks);
		setisEditingIndex(null);
	};

	const handleCancelEdit = () => {
		setisEditingIndex(null);
	};

	const handleDeleteBtn = (index) => {
		const updatedTasks = pulledTasks.filter((_, i) => i !== index);
		const id = pulledTasks[index].meetingId;
		deleteConference(id);
		setPulledTasks(updatedTasks);
		if (index === isEditingIndex) {
			setisEditingIndex(null);
		}
		T;
		if (pulledTasks.length <= 1) {
			setTaggedDates((prevDates) => prevDates.filter((date) => date !== activeDate));
		}
	};

	const handleZoomBtn = (index) => {
		window.location.href = pulledTasks[index].meetingUrl;
	};

	return (
		<>
			<FormControl className={styles.tasks}>
				{pulledTasks.map((task, index) => {
					console.log(task.timeStart);
					return (
						<div className={styles.tasks__task} key={`${index}-${task.timeStart} ${task.timeEnd}`}>
							<TextField
								sx={{ border: '1px solid', borderRadius: '5px' }}
								className={styles.planner__textField}
								multiline={true}
								value={isEditingIndex === index ? editingValue : task.taskValue}
								onChange={(e) => {
									if (isEditingIndex === index) {
										handleTaskInputChange(e.target.value);
									}
								}}
								type='text'
								InputProps={{
									endAdornment: (
										<div className={styles.tasks__add__time}>
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<TimePicker
													closeOnSelect={false}
													label='начало'
													ampm={false}
													autoOk={false}
													orientation='landscape'
													value={dayjs(task.timeStart)}
													onChange={(time) => {
														console.log(time);
													}}
													onAccept={(time) => {
														upDateStartTimeFor(time, index);
													}}
												/>
												<TimePicker
													label='конец'
													ampm={false}
													value={dayjs(task.timeEnd)}
													onChange={(time) => {}}
													onAccept={() => {
														upDateTimeForAddedTask();
													}}
												/>
											</LocalizationProvider>
										</div>
									),
								}}
							/>
							<div className={styles.tasks_btns}>
								<button>
									<VideocamIcon
										sx={{ color: 'blue' }}
										onClick={() => {
											handleZoomBtn(index);
										}}
									/>
								</button>
								<button>
									<DeleteForeverIcon
										onClick={() => {
											handleDeleteBtn(index);
										}}
									/>
								</button>
								{isEditingIndex === index ? (
									<>
										<button>
											<CheckCircleOutlineIcon onClick={() => handleSaveEdit(index)} />
										</button>
										<button>
											<CancelIcon onClick={handleCancelEdit} />
										</button>
									</>
								) : (
									<button>
										<ModeEditIcon onClick={() => handleEditBtn(index)} />
									</button>
								)}
							</div>
						</div>
					);
				})}
			</FormControl>
		</>
	);
};

export default AddedTasks;
