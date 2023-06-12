import * as React from 'react';
import { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={{ color: 'red' }}>
					Text in a modal
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
