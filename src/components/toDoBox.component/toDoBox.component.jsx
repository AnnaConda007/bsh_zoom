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
		if (addTaskInput.trim() === '') return;
		setTasks([...tasks, addTaskInput]);
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
		setTasks(tasks.filter((_, i) => i !== index));
		if (index === isEditingIndex) {
			setisEditingIndex(null);
		}
	};

	return (
		<>
			<div
				style={{
					backgroundColor: 'pink',
					width: '90%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'spaseEvenly',
					flexWrap: 'wrap',
				}}
			>
				<TextField
					sx={{ width: '100%' }}
					multiline='true'
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

				<FormControl sx={{ width: '100%', overflow: 'auto', height: '80%', outline: 'none' }}>
					{tasks.map((taskValue, index) => (
						<TextField
							sx={{ width: '100%' }}
							multiline='true'
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
									<div style={{ display: 'flex' }}>
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
