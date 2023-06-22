import { useState } from 'react';
import './toDoBox.styles.scss';
import { pushTasks } from '../../../utils/updateTask';
import dayjs from 'dayjs';
import AddNewTask from './addNewTask/AddNewTask';
import AddedTasks from './addedTasks/addedTasks';

const ToDoBox = ({ tasksForSelectedDate, dates, setDates, activeDate }) => {
	const [pulledTasks, setPulledTasks] = useState(tasksForSelectedDate);
	const [isEditingIndex, setisEditingIndex] = useState(null);
	const [editingValue, setEditingValue] = useState('');

	const upDateTimeForAddedTask = (time, index, timeKey) => {
		const updatedTasks = [...pulledTasks];
		updatedTasks[index][timeKey] = time.toISOString();
		pushTasks(updatedTasks);
		setPulledTasks(updatedTasks);
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
		const formattedDate = dayjs(activeDate.day.$d).format('DD-MM-YYYY');
		if (dates.includes(formattedDate)) {
			setDates((prevDates) => prevDates.filter((date) => date !== formattedDate));
		}
	};

	return (
		<>
			<div className='planner'>
				<AddNewTask
					tasksForSelectedDate={tasksForSelectedDate}
					dates={dates}
					setDates={setDates}
					activeDate={activeDate}
					pulledTasks={pulledTasks}
					setPulledTasks={setPulledTasks}
				/>
				<AddedTasks
					tasksForSelectedDate={tasksForSelectedDate}
					dates={dates}
					setDates={setDates}
					activeDate={activeDate}
					pulledTasks={pulledTasks}
					setPulledTasks={setPulledTasks}
				/>
			</div>
		</>
	);
};

export default ToDoBox;
