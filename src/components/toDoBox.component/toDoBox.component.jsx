import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import './toDoBox.styles.scss';
import { pushTasks } from '../../../utils/updateTask';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const ToDoBox = ({ tasksForSelectedDate }) => {
	const defaultTask = { taskValue: '', timeStart: '', timeEnd: '' };
	const [newTaskObj, setNewTaskObj] = useState(defaultTask);
	const { taskValue, timeStart, timeEnd } = newTaskObj;
	const [pulledTasks, setPulledTasks] = useState(tasksForSelectedDate);
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');

	const fullnessTimeForTask = (selectedTime, timeKey) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			[timeKey]: selectedTime,
		}));
	};

	const fullnessValueForTask = (value) => {
		setNewTaskObj((prevTask) => ({
			...prevTask,
			taskValue: value,
		}));
	};

	const handleAddTaskBtn = () => {
		if (taskValue.trim() === '') return;
		const updatedTasks = [...pulledTasks];
		updatedTasks.push(newTaskObj);
		setPulledTasks(updatedTasks);
		pushTasks(updatedTasks);
		setNewTaskObj(defaultTask);
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
	};

	return (
		<>
			<div className='planner'>
				<div className='planner__textField-wrap planner__textField-wrap--add'>
					<TextField
						className='planner__textField'
						multiline={true}
						onChange={(e) => {
							fullnessValueForTask(e.target.value);
						}}
						value={taskValue} 
					/>
					<div className='add__time'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label='c'
								ampm={false}
								className='add__start-time --timePicker'
								value={timeStart}
								onChange={(time) => {
									fullnessTimeForTask(time, 'timeStart');
								}}
							/>
							<TimePicker
								label='до'
								value={timeEnd}
								ampm={false}
								className='add__end-time --timePicker'
								onChange={(time) => {
									fullnessTimeForTask(time, 'timeEnd');
								}}
							/>
						</LocalizationProvider>
					</div>
					<button>
									<AddCircleOutlineIcon onClick={handleAddTaskBtn} />
								</button>
				</div>

				<FormControl className='planner__tasks'>
					{pulledTasks.map((task, index) => {
						const { taskValue } = task;
						return (
							<div className='planner__textField-wrap --added' key={`${index}-${task.timeStart} ${task.timeEnd}`}>
								<TextField
									className='planner__textField'
									multiline={true}
									value={isEditingIndex === index ? editingValue : taskValue}
									onChange={(e) => {
										if (isEditingIndex === index) {
											handleTaskInputChange(e.target.value);
										}
									}}
									type='text'
									InputProps={{
										endAdornment: (
											<div className='planner__edit-btns'>
												<button>
													<DeleteForeverIcon onClick={() => handleDeleteBtn(index)} />
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
										),
									}}
								/>
								<div className='add__time'>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<TimePicker
											label='c'
											ampm={false}
											className='add__start-time --timePicker'
											orientation='landscape'
											value={task.timeStart}
										/>
										<TimePicker label='до' ampm={false} className='add__end-time --timePicker' value={task.timeEnd} />
									</LocalizationProvider>
								</div>
							</div>
						);
					})}
				</FormControl>
			</div>
		</>
	);
};

export default ToDoBox;
