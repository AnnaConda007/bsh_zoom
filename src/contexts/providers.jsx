import { CalendarProvider } from './calendar.context';
import { ZoomProvider } from './zoom.context';
export const Providers = ({ children }) => {
	return (
		<CalendarProvider>
			<ZoomProvider>{children}</ZoomProvider>
		</CalendarProvider>
	);
};
