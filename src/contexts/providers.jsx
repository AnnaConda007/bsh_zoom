import { ActiveDateProvider } from './activeDateContext';
import { TaggetDatesProvider } from './taggedDates';
import { ZoomTokenProvider } from './zoom-token.context'; 
export const Providers = ({ children }) => {
	return (
		<ActiveDateProvider>
			<TaggetDatesProvider>
				<ZoomTokenProvider> 
					{children}
				</ZoomTokenProvider>
			</TaggetDatesProvider>
		</ActiveDateProvider>
	);
};
