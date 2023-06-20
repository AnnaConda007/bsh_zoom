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
	const defaultTask = { task: '', timeStart: '', timeEnd: '' };
	const [newTask, setNewTask] = useState(defaultTask);
	const [tasks, setTasks] = useState(tasksForSelectedDate);

	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');

	const fullnessTimeForTask = (selectedTime, timeKey) => {
		setNewTask((prevTask) => ({
			...prevTask,
			[timeKey]: selectedTime,
		}));
	};
	const fullnessValueForTask = (value) => {
		setNewTask((prevTask) => ({
			...prevTask,
			task: value,
		}));
	};



	const handleAddTaskBtn = () => {
		if (newTask.task.trim() === '') return;
		const updatedTasks = [...tasks];
		updatedTasks.push(newTask);
		setTasks(updatedTasks);
		pushTasks(updatedTasks);
		setNewTask(defaultTask)
 	};

	const handleEditBtn = (index) => {
		setisEditingIndex(index);
		setEditingValue(tasks[index].task);
	};

	const handleTaskInputChange = (newValue) => {
		setEditingValue(newValue);
	};

	const handleSaveEdit = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].task = editingValue;
		pushTasks(updatedTasks);
		setTasks(updatedTasks);
		setisEditingIndex(null);
	};

	const handleCancelEdit = () => {
		setisEditingIndex(null);
	};

	const handleDeleteBtn = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		pushTasks(updatedTasks);

		setTasks(updatedTasks);
		if (index === isEditingIndex) {
			setisEditingIndex(null);
		}
	};

	return (
		<>
			<div className='planner'>
				<div className='planner__textField-wrap --add'>
					<TextField
						className='planner__textField'
						multiline={true}
						onChange={(e) => {
							fullnessValueForTask(e.target.value);
						}}
						value={newTask.task}
						InputProps={{
							endAdornment: (
								<button>
									<AddCircleOutlineIcon onClick={handleAddTaskBtn} />
								</button>
							),
						}}
					/>
					<div className='add__time'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label='c'
								ampm={false}
								className='add__start-time --timePicker'
								value={newTask.timeStart}
								onChange={(time) => {
									fullnessTimeForTask(time, 'timeStart');
								}}
							/>
							<TimePicker
								label='до'
									value={newTask.timeEnd}
								ampm={false}
								className='add__end-time --timePicker'
								onChange={(time) => {
									fullnessTimeForTask(time, 'timeEnd');
								}}
							/>
						</LocalizationProvider>
					</div>
				</div>

				<FormControl className='planner__tasks'>
					{tasks.map((task, index) => (
						<div className='planner__textField-wrap --added' key={`${index}-${task.timeStart} ${task.timeEnd}`}>
							<TextField
								className='planner__textField'
								multiline={true}
								value={isEditingIndex === index ? editingValue : task.task}
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
									<TimePicker label='c' ampm={false} className='add__start-time --timePicker' orientation='landscape'  value={task.timeStart}/>
									<TimePicker label='до' ampm={false} className='add__end-time --timePicker' value={task.timeEnd} />
								</LocalizationProvider>
							</div>
						</div>
					))}
				</FormControl>
			</div>
		</>
	);
};

export default ToDoBox;
