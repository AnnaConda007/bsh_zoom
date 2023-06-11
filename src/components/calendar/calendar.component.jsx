import { DatePicker } from '@mui/x-date-pickers/DatePicker'; //пакет методов для выбора датыi
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // компонент для вызова календаря и выбора даты
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'; // сам календарь

const Calendar = () => {
	return (
		<>
			<DatePicker label='Basic date picker' />
			<p>текст, пропадающий при добавлении DatePicker </p>
		</>
	);
};
export default Calendar;
