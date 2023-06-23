import { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ru';
import { pullTask } from '../../../utils/updateTask';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import { getDayTask } from '../../../utils/updateTask';

const ModalBox = ({ activeDate, setModal, modal }) => {
	const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
	const [dates, setDates] = useState([]);

	useEffect(() => {
		const fetchDates = async () => {
			const datesArray = await getDayTask();
			setDates(datesArray);
		};
		fetchDates();

		const fetchTasks = async () => {
			const taskForDate = await pullTask(activeDate);
			setTasksForSelectedDate(taskForDate);
			console.log("activeDate", activeDate)
		};
 		fetchTasks();
	}, []);

	const handleClose = () => {
		setModal(false);
	};

	return (
		<>
			<Modal
				onClose={handleClose}
				className='modal'
				open={modal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className='modal__box'>
					<div className='modal__btn-wrap'>
						<Button onClick={handleClose}>
							<CloseIcon className='modal__btn' />
						</Button>
					</div>
					<div className='modal__ToDoBox-wrap'>
						<ToDoBox
							tasksForSelectedDate={tasksForSelectedDate}
							setDates={setDates}
							dates={dates}
							activeDate={activeDate}
						/>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default ModalBox;
