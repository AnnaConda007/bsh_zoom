import { DatesProvider } from './dates.context';
import { DisabledCProvider } from './disabled.context';
import { TaskInfoProvider } from './taskInfo.context';
export const Providers = ({ children }) => {
	return (
		<DatesProvider>
			<TaskInfoProvider>
				<DisabledCProvider>{children} </DisabledCProvider>
			</TaskInfoProvider>
		</DatesProvider>
	);
};
