import { useEffect, useState, useContext } from 'react';
import { Badge } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Header from '../header/header';
import styles from './calendar.module.scss';
import { CalendarContext } from '../../contexts/CalendarContext.context';
import { pickersDay } from './pickersDay-style';
import ModalBox from '../ModalBox/modalBox';
import { getZoomToken, getListMeeting, getTaggedDate } from '../../../utils/zoom.utils';
import { getConferenceInfo } from '../../../utils/zoom.utils';
import { homeUrL } from '../../../contains';

const Calendar = () => {
	const [modal, setModal] = useState(false);
	const { setActiveDate, taggedDates, setTaggedDates } = useContext(CalendarContext);

	useEffect(() => {
		const getData = async () => {
			await getZoomToken(homeUrL);
			setTaggedDates(await getTaggedDate());
 
		};
		getData();
	}, []);

	const handleDateClick = async (date) => {
		const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
		setActiveDate(formattedDate);
		setModal(true);
	};

	const slotProps = {
		day: (date) => {
			const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
			const isDateInArray = taggedDates.includes(formattedDate);
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
