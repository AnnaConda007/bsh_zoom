import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calendar.styles.scss';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const Calendar = () => {
	const [open, setOpen] = useState(false);

	const handleDateChange = (date) => {
		console.log(date);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const isWeekend = (date) => {
		const dayOfWeek = dayjs(date).day();
		return dayOfWeek === 5 || dayOfWeek === 6;
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
					<div
						style={{ height: '95%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					>
						<ToDoBox />
					</div>
				</Box>
			</Modal>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateCalendar onChange={handleDateChange} shouldDisableDate={isWeekend} />
				</LocalizationProvider>
			</ThemeProvider>
		</>
	);
};

export default Calendar;
