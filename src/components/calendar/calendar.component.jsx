import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ru';
import './calendar.styles.scss';
const Calendar = () => {
	const [open, setOpen] = useState(false);

	const handleDateChange = (date) => {
		//	console.log(date);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Modal
				className='modal'
				open={open}
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
						<ToDoBox />
					</div>
				</Box>
			</Modal>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
				<DateCalendar onChange={handleDateChange} />
			</LocalizationProvider>
		</>
	);
};

export default Calendar;
