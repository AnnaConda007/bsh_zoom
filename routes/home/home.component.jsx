import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getfixAuthorizationTime from '../../utils/getTime.utils';
const Home = () => {
	const navigate = useNavigate();
	const autosaveTime = 5; //6048000
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

	return <p>календарь</p>;
};
export default Home;
