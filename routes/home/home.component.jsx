import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getfixAuthorizationTime from '../../utils/getTime.utils';
import Calendar from '../../src/components/calendar/calendar.component';
const Home = () => {
	const navigate = useNavigate();
	const autosaveTime = 604800000; //неделя
	const authorizationTime = parseInt(localStorage.getItem('authorizationTime'));
	const [currentTime, setCurrentTime] = useState(null);
	useEffect(() => {
		const fetchCurrentTime = async () => {
			const time = await getfixAuthorizationTime();
			setCurrentTime(time);
		};
		fetchCurrentTime();
	}, []);
	useEffect(() => {
		const isExpired = authorizationTime + autosaveTime;
		if (!authorizationTime || currentTime > isExpired) {
			navigate('authorization');
		}
	}, [currentTime]);

	return (
		<>
			<Calendar />
		</>
	);
};
export default Home;
