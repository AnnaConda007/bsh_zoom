import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calendar.styles.scss';
import ToDoBox from '../toDoBox.component/toDoBox.component';
const Calendar = () => {
	const [open, setOpen] = useState(false);

	const handleDateChange = (date) => {
		console.log(date);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
						backgroundColor: 'rgb(126, 120, 252)',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ToDoBox />

					<Button onClick={handleClose}>Close</Button>
				</Box>
			</Modal>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar
 					onChange={(data) => {
						handleDateChange(data);
					}}
				/>
			</LocalizationProvider>
		</>
	);
};

export default Calendar;
