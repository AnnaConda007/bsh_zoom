import { Button } from '@mui/material';
import styles from './header.module.scss';
const Header = () => {
	const login = localStorage.getItem('email');
	return (
		<div className={styles.header}>
			<div className={styles.header__info}>
				<span>{login}</span>
				<Button
					variant='contained'
					onClick={() => {
						localStorage.removeItem('authorizationTime');
					}}
				>
					выйти
				</Button>
			</div>
		</div>
	);
};

export default Header;
