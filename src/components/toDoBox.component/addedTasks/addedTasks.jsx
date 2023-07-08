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

const AddedTasks = ({ pulledTasks, setPulledTasks }) => {
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');
	const { activeDate,  setTaggedDates } = useContext(CalendarContext);

	const upDateTimeForAddedTask = (time, index, timeKey) => {
		const updatedTasks = [...pulledTasks];
		updatedTasks[index][timeKey] = time.toISOString();
		pushTasks(updatedTasks);
		setPulledTasks(updatedTasks);
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
		pushTasks(updatedTasks);
		setPulledTasks(updatedTasks);
		setisEditingIndex(null);
	};

	const handleCancelEdit = () => {
		setisEditingIndex(null);
	};

	const handleDeleteBtn = (index) => {
		const updatedTasks = pulledTasks.filter((_, i) => i !== index);
		pushTasks(updatedTasks);
		setPulledTasks(updatedTasks);
		if (index === isEditingIndex) {
			setisEditingIndex(null);
		}

		if (pulledTasks.length <= 1) {
			setTaggedDates((prevDates) => prevDates.filter((date) => date !== activeDate));
		}
	};

	const handleZoomBtn = (index) => {};

	return (
		<>
			<FormControl className={styles.tasks}>
				{pulledTasks.map((task, index) => {
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
													label='начало'
													ampm={false}
													orientation='landscape'
													value={dayjs(task.timeStart)}
													onChange={(time) => {
														upDateTimeForAddedTask(time, index, 'timeStart');
													}}
												/>
												<TimePicker
													label='конец'
													ampm={false}
													value={dayjs(task.timeEnd)}
													onChange={(time) => {
														upDateTimeForAddedTask(time, index, 'timeEnd');
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
