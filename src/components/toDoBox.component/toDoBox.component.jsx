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

	const handleEnterForAdd = (event) => {
		// добавление через энтер
		if (event.key === 'Enter') {
			handleAddTaskBtn();
		}
	};

	const handleInputRef = (element, index) => {
		// опрделение активного инпут
		inputRefs.current[index] = element;
	};

	const handleEditBtn = (index) => {
		// запуск редактирования
		setIsEditing(!isEditing);
		if (inputRefs.current[index]) {
			inputRefs.current[index].focus();
		}
		if (isEditing) {
			inputRefs.current[index].blur();
		}
	};

	const handleTaskInputChange = (index, value) => {
		// перезаписывание значения инпута при редактировании
		if (!isEditing) return;
		const updatedTasks = [...tasks];
		updatedTasks[index] = value;
		setTasks(updatedTasks);
	};

	const handleEnterForEditFinish = (e, index) => {
		// снятие фокуса при нажатии на enter
		if (e.key === 'Enter') {
			setIsEditing(null);
			inputRefs.current[index].blur();
		}
	};

	const handleDeleteBtn = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
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
						{tasks.map((task, index) => (
							<TextField
								key={index}
								onKeyDown={(e) => {
									handleEnterForEditFinish(e, index);
								}}
								value={task}
								inputRef={(element) => handleInputRef(element, index)}
								onChange={(e) => handleTaskInputChange(index, e.target.value)}
								type='text'
								InputProps={{
									endAdornment: (
										<div>
											<button>
												<DeleteForeverIcon onClick={() => handleDeleteBtn(index)} />
											</button>
											<button>
												<ModeEditIcon onClick={() => handleEditBtn(index)} />
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
