import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');

	const handleAddTaskBtn = () => {
		if (addTaskInput === '') return;
		setTasks([...tasks, addTaskInput]);
		setAddTaskInput('');
	};

	const handleEnterForAdd = (event) => {
		if (event.key === 'Enter') {
			handleAddTaskBtn();
		}
	};

	const handleEditBtn = (index) => {
		setisEditingIndex(index);
		setEditingValue(tasks[index]);//достаю значение старое
	};

	const handleTaskInputChange = (value) => {//стало
		setEditingValue(value);
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
		setTasks(tasks.filter((_, i) => i !== index));
		if (index === isEditingIndex) {
			setisEditingIndex(null);
		}
	};

	return (
		<>
			<div className='to-do-wrap'>
				<div className='to-do-wrap__add'>
					<TextField
						onKeyDown={handleEnterForAdd}
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
				</div>
				<div className='to-do-wrap__tasks'>
					<FormControl>
						{tasks.map((taskValue, index) => (
							<TextField
								key={index}
								value={isEditingIndex === index ? editingValue : taskValue}
								onChange={(e) => handleTaskInputChange(e.target.value)}
								type='text'
								InputProps={{
									endAdornment: (
										<div>
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
			</div>
		</>
	);
};

export default ToDoBox;
