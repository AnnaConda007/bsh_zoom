import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // установлен как отдельный пакет, не mui
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // установлен вместе с  @mui x-date-pickers
const Calendar = () => {
	return (
		<>
			<DatePicker />
			<p>текст, пропадающий при добавлении DatePicker </p>
		</>
	);
};
export default Calendar;
