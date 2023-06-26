 import { ActiveDateProvider } from './activeDateContext';
 import { TaggetDatesProvider } from './taggedDates';
export const Providers = ({ children }) => {
	return (
		<ActiveDateProvider>
			<TaggetDatesProvider>{children}</TaggetDatesProvider>
		</ActiveDateProvider>
	);
};
