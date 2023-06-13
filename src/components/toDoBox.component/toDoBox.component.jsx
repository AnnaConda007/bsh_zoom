import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);
	const [isEditing, setIsEditing] = useState(null);
	const [editIndex, setEditIndex] = useState(null);

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
		// перезаписывание значения инпута при редактирвоании
		if (!isEditing) return;
		const updatedTasks = [...tasks];
		updatedTasks[index] = value;
		setTasks(updatedTasks);
	};

	const handleEditClick = (index) => {
		// запуск редактирования
		setIsEditing(!isEditing); // обновляю состояние - что бы запускалось handleTaskInputChange
		setEditIndex(index); // обновляю значение, что бы включить автофокус при ререндеринге
		console.log(tasks);
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
						{tasks.map((task, index) => {
							console.log(index === editIndex); // после клика по "редактировать", выводит true(при условии, что введена только одна задача)
							return (
								<TextField
									autoFocus={index === editIndex} // но тут никогда не срабатывает, хоть сравнение и возвращет true
									key={index}
									value={task}
									onChange={(e) => handleTaskInputChange(index, e.target.value)}
									type='text'
									InputProps={{
										endAdornment: (
											<div>
												<button>
													<DeleteForeverIcon />
												</button>
												<button>
													<ModeEditIcon
														onClick={() => {
															handleEditClick(index);
														}}
													/>
												</button>
											</div>
										),
									}}
								/>
							);
						})}
					</FormControl>
				</div>
			</div>
		</>
	);
};

export default ToDoBox;
