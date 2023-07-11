import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
const Header = () => {
	const login = localStorage.getItem('email');
	return (
		<div className={styles.header}>
			<div className={styles.header__info}>
				<span>{login}</span>
				<Link to='/authorization'>
					<Button
						variant='contained'
						onClick={() => {
							localStorage.removeItem('authorizationTime');
							localStorage.removeItem('zoomRefreshToken');
						}}
					>
						выйти
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Header;
