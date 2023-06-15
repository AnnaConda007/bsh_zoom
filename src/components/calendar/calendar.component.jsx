import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calendar.styles.scss';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const Calendar = () => {
	const [open, setOpen] = useState(true);

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
				open={open}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Box
					sx={{
						backgroundColor: 'rgb(126, 120, 252)',
						maxHeight: '600px',
						height: '100%',
						maxWidth: '1000px',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					<div style={{ width: '100%', backgroundColor: 'red', textAlign: 'right', height: '5%' }}>
						<Button onClick={handleClose}>Close</Button>
					</div>
					<div
						style={{ height: '95%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					>
						<ToDoBox  />
					</div>
				</Box>
			</Modal>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar onChange={handleDateChange} shouldDisableDate={isWeekend} />
			</LocalizationProvider>
		</>
	);
};

export default Calendar;
