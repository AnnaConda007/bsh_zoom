import { useState } from 'react';
import './toDoBox.styles.scss';
import AddNewTask from './addNewTask/AddNewTask';
import AddedTasks from './addedTasks/addedTasks';

const ToDoBox = ({ tasksForSelectedDate, dates, setDates, activeDate }) => {
	const [pulledTasks, setPulledTasks] = useState(tasksForSelectedDate);

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
