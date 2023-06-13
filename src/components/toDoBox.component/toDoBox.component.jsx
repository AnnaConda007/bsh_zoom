import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useRef } from 'react';

const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);
	const [isEditing, setIsEditing] = useState(null);
	const inputRefs = useRef([]);

	const handleAddTaskBtn = () => {
		// добавление новой задачи
		if (addTaskInput === '') return;
		setTasks([...tasks, addTaskInput]);
		setAddTaskInput('');
	};

	const handleEnterDown = (event) => {
		// добавление через энтер
		if (event.key === 'Enter') {
			handleAddTaskBtn();
		}
	};

	const handleTaskInputChange = (index, value) => {
		// перезаписывание значения инпута при редактировании
		if (!isEditing) return;
		const updatedTasks = [...tasks];
		updatedTasks[index] = value;
		setTasks(updatedTasks);
	};

	const handleEditClick = (index) => {
		// запуск редактирования
		setIsEditing(!isEditing);
		if (inputRefs.current[index]) {
			inputRefs.current[index].focus();
		}
	};

	const handleDeleteClick = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};

	const handleInputRef = (element, index) => {
		inputRefs.current[index] = element;
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
								inputRef={(element) => handleInputRef(element, index)}
								onChange={(e) => handleTaskInputChange(index, e.target.value)}
								type='text'
								InputProps={{
									endAdornment: (
										<div>
											<button>
												<DeleteForeverIcon onClick={() => handleDeleteClick(index)} />
											</button>
											<button>
												<ModeEditIcon onClick={() => handleEditClick(index)} />
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
