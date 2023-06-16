import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './toDoBox.styles.scss';
import { useEffect } from 'react';
const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');
	const pullTask = async () => {
		const res = await fetch('https://test-f176b-default-rtdb.firebaseio.com/tasks/.json');
		const resJson = await res.json();
		const tasks = resJson ? resJson : [];
		setTasks(tasks);
		console.log(tasks);
	};
	const pushTasks = async (updatedTasks) => {
		await fetch('https://test-f176b-default-rtdb.firebaseio.com/tasks/.json', {
			method: 'PUT',
			body: JSON.stringify(updatedTasks),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(tasks);
	};
	useEffect(() => {
		pullTask();
	}, []);

	const handleAddTaskBtn = () => {
		if (addTaskInput.trim() === '') return;
		const updatedTasks = [...tasks];
		updatedTasks.push(addTaskInput);
		setTasks(updatedTasks);
		pushTasks(updatedTasks);

		setAddTaskInput('');
	};

	const handleEditBtn = (index) => {
		setisEditingIndex(index);
		setEditingValue(tasks[index]);
	};

	const handleTaskInputChange = (newValue) => {
		setEditingValue(newValue);
	};

	const handleSaveEdit = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index] = editingValue;
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
				<ThemeProvider theme={theme}>
					<TextField
						className='planner__add'
						multiline={true}
						onChange={(e) => {
							setAddTaskInput(e.target.value);
						}}
						value={addTaskInput}
						InputProps={{
							endAdornment: (
								<button>
									<AddCircleOutlineIcon onClick={handleAddTaskBtn} />
								</button>
							),
						}}
					/>
				</ThemeProvider>

				<FormControl className='planner__tasks'>
					{tasks.map((taskValue, index) => (
						<TextField
							className='planner__task'
							multiline={true}
							key={index}
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
					))}
				</FormControl>
			</div>
		</>
	);
};

export default ToDoBox;
