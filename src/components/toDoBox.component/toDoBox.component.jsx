import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
const ToDoBox = () => {
	const [addTaskInput, setAddTaskInput] = useState('');
	let [tasks, setTasks] = useState([]);

	const handleСhangeInput = (e) => {
		setAddTaskInput(e.target.value);
	};
	const handleAddTask = () => {
		if (addTaskInput === '') return;
		setTasks([...tasks, addTaskInput]);
		setAddTaskInput('');
	};
	const handleEnterDown = (event) => {
		if (event.key === 'Enter') {
			handleAddTask();
		}
	};

	return (
		<>
			<div className='to-do-wrap'>
				<div className='to-do-wrap__add'>
					<TextField
						onKeyDown={handleEnterDown}
						onChange={handleСhangeInput}
						value={addTaskInput}
						InputProps={{
							endAdornment: <AddCircleOutlineIcon onClick={handleAddTask} />,
						}}
					/>
				</div>
				<div className='to-do-wrap__tasks'>
					<FormControl>
						{tasks.map((task, i) => {
							return (
								<TextField
									key={i}
									value={task}
									InputProps={{
										endAdornment: (
											<div>
												<DeleteForeverIcon />
												<ModeEditIcon />
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
