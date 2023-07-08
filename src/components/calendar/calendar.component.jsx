import { useEffect, useState, useContext } from 'react';
import { Badge } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Header from '../header/header';
import styles from './calendar.module.scss';
import { ActiveDateContext } from '../../contexts/activeDateContext';
import { pickersDay } from './pickersDay-style';
import { getDayTask } from '../../../utils/updateTask';
import ModalBox from '../ModalBox/modalBox';
import { TaggetDatesContext } from '../../contexts/taggedDates';
import { DateMeetingContext } from '../../contexts/dateMeeting.context';
const Calendar = () => {
	const [modal, setModal] = useState(false);
	const { activeDate, setActiveDate } = useContext(ActiveDateContext);
	const { dates, setDates } = useContext(TaggetDatesContext);

	useEffect(() => {
		const fetchData = async () => {
			const datesArray = await getDayTask();
			setDates(datesArray);
		};
		fetchData();
	}, []);

	const handleDateClick = async (date) => {
		const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
		setActiveDate(formattedDate);
		setModal(true);
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
		<div className={styles.wrap}>
			<ModalBox modal={modal} setModal={setModal} />
			<Header />
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
				<DateCalendar slots={{ day: ServerDay }} slotProps={slotProps} />
			</LocalizationProvider>
		</div>
	);
};

export default Calendar;
