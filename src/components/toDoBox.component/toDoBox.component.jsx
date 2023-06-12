import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useRef } from 'react';

const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);
	const [isEditing, setIsEditing] = useState(null);
	const textFieldRef = useRef(null);

	const handleAddTaskBtn = () => {
		if (addTaskInput === '') return;
		setTasks([...tasks, addTaskInput]);
		setAddTaskInput('');
	};

	const handleEnterDown = (event) => {
		if (event.key === 'Enter') {
			handleAddTaskBtn();
		}
	};

	const handleTaskInputChange = (index, value) => {
		if (!isEditing) return;
		const updatedTasks = [...tasks];
		updatedTasks[index] = value;
		setTasks(updatedTasks);
		console.log(tasks);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
		if (!isEditing && textFieldRef.current) {
			textFieldRef.current.focus();
		}
	};

	return (
		<>
			<div className='to-do-wrap'>
				<div className='to-do-wrap__add'>
					<TextField
						onKeyDown={handleEnterDown}
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
						{tasks.map((task, index) => (
							<TextField
								key={index}
								value={task}
								onChange={(e) => handleTaskInputChange(index, e.target.value)}
								inputRef={textFieldRef}
								InputProps={{
									endAdornment: (
										<div>
											<button>
												<DeleteForeverIcon />
											</button>
											<button>
												<ModeEditIcon onClick={handleEditClick} />
											</button>
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
