import { CalendarProvider } from './CalendarContext.context';
export const Providers = ({ children }) => {
	return <CalendarProvider>{children}</CalendarProvider>;
};
