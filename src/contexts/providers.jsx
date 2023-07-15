import { DatesProvider } from './dates.context';
import { ZoomProvider } from './zoom.context';
import { DisabledCProvider } from './disabled.context';
export const Providers = ({ children }) => {
	return (
		<DatesProvider>
			<ZoomProvider>
				<DisabledCProvider>{children}</DisabledCProvider>
			</ZoomProvider>
		</DatesProvider>
	);
};
