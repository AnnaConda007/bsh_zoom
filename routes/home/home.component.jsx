import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getfixAuthorizationTime from '../../utils/getTime.utils';
const Home = () => {
	const navigate = useNavigate();
	const autosaveTime = 30; //6048000
	const authorizationTime = parseInt(localStorage.getItem('authorizationTime'));
	const [currentTime, setCurrentTime] = useState(null);
	useEffect(() => {
		const fetchCurrentTime = async () => {
			const time = await getfixAuthorizationTime();
			setCurrentTime(time);
		};
		fetchCurrentTime();
	}, []);

	const isExpired = authorizationTime + autosaveTime;
	if (!authorizationTime || currentTime > isExpired) {
		navigate('authorization');
	}
	return <p>календарь</p>;
};
export default Home;
