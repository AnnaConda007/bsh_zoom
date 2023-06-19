import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { pullTask } from '../../../utils/updateTask';
import 'dayjs/locale/ru';
import './calendar.styles.scss';

const Calendar = () => {
	const [openModal, setOpenModal] = useState(false);
	const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

	const handleDateClick = async (date) => {
		const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
		const fetchTasks = await pullTask(formattedDate);
		setOpenModal(true);
		setTasksForSelectedDate(fetchTasks);
	};

	const handleClose = () => {
		setOpenModal(false);
	};
	const slotProps = {
		day: (date) => {
			return {
				onClick: () => handleDateClick(date),
			};
		},
	};
	return (
		<>
			<Modal
				className='modal'
				open={openModal}
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
						<ToDoBox tasksForSelectedDate={tasksForSelectedDate} />
					</div>
				</Box>
			</Modal>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
				<DateCalendar slotProps={slotProps} />
			</LocalizationProvider>
		</>
	);
};

export default Calendar;
