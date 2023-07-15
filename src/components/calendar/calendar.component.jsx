import { useEffect, useState, useContext } from 'react';
import { Badge } from '@mui/material';
import { pickersDay } from './pickersDay-style';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Header from '../header/header';
import ModalBox from '../modal/modal';
import { getTaggedDate } from '../../../utils/getZoomData.utils';
import { homeUrL } from '../../../contains';
import { getZoomTokens } from '../../../utils/getZoomData.utils';
import { checkPastDate } from '../../../utils/currentTime.utils';
import { DisabledContext } from '../../contexts/disabled.context';
import { DatesContext } from '../../contexts/dates.context';
import styles from './calendar.module.scss';

const Calendar = () => {
	const [modal, setModal] = useState(false);
	const { setActiveDate, taggedDates, setTaggedDates } = useContext(DatesContext);
	const { SetDisabledDate } = useContext(DisabledContext);

	useEffect(() => {
		const getData = async () => {
			await getZoomTokens(homeUrL);
			setTaggedDates(await getTaggedDate());
		};
		getData();
	}, []);

	const handleDateClick = async (date) => {
		const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY');
		setActiveDate(formattedDate);
		const disabledDateDate = await checkPastDate(formattedDate);
		SetDisabledDate(disabledDateDate);
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
