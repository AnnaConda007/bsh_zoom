import { useEffect, useState } from 'react';
import { Modal, Box, Button, Badge } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { pullTask } from '../../../utils/updateTask';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import './calendar.styles.scss';
import { pickersDay } from './pickersDay-style';
import { getDayTask } from '../../../utils/updateTask';
const Calendar = () => {
	const [openModal, setOpenModal] = useState(false);
	const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
	const [dates, setDates] = useState([]);
	const login = localStorage.getItem('email');
	useEffect(() => {
		const fetchData = async () => {
			const datesArray = await getDayTask();
			setDates(datesArray);
		};
		fetchData();
	}, []);

	const handleDateClick = async (date) => {
		const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
		const taskForDate = await pullTask(formattedDate);
		setOpenModal(true);
		setTasksForSelectedDate(taskForDate);
	};

	const handleClose = () => {
		setOpenModal(false);
	};
	const slotProps = {
		day: (date) => {
			const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
			const isDateInArray = dates.includes(formattedDate);
			return {
				onClick: () => handleDateClick(date),
				isDateInArray,
			};
		},
	};
	const ServerDay = (props) => {
		const { day, isDateInArray, ...other } = props;
		return (
			<Badge key={day.toString()} overlap='circular' badgeContent={isDateInArray ? '🟢' : undefined}>
				<PickersDay {...other} day={day} sx={pickersDay} />
			</Badge>
		);
	};
	return (
		<div className='wrap'>
			<Modal
				onClose={handleClose}
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
			<div className='user-wrap'>
				<div className='user-wrap__info'>
					<span>{login}</span>
					<Button
						variant='contained'
						onClick={() => {
							localStorage.removeItem('authorizationTime');
						}}
					>
						выйти
					</Button>
				</div>
			</div>

			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
				<DateCalendar slots={{ day: ServerDay }} slotProps={slotProps} />
			</LocalizationProvider>
		</div>
	);
};

export default Calendar;
