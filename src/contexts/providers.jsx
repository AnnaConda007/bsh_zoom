 import { ActiveDateProvider } from './activeDateContext';
import { PulledTaskProvider } from './pulledTaskContext';

export const Providers = ({ children }) => {
	return (
		<ActiveDateProvider>
			<PulledTaskProvider>{children}</PulledTaskProvider>
		</ActiveDateProvider>
	);
};
