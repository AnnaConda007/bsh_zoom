import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl } from '@mui/material';
import getfixAuthorizationTime from '../../../utils/getTime.utils';
import './authorizationform.styles.scss';
function AuthorizationForm() {
	const navigate = useNavigate();
	const [currentTime, setCurrentTime] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchCurrentTime = async () => {
			const time = await getfixAuthorizationTime();
			setCurrentTime(time);
		};
		fetchCurrentTime();
	}, []);

	const formValueDefault = {
		email: 'user@mail.ru', // очистить
		password: '111111', // очистить
	};
	const [formValue, setFormValue] = useState(formValueDefault);
	let { email, password } = formValue;
	const changeInput = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const sendAuthorizationData = async () => {
		try {
			const apiKey = import.meta.env.VITE_DB_API;
			const authorizationUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
			const response = await fetch(`${authorizationUrl}${apiKey}`, {
				method: 'POST',
				body: JSON.stringify(formValue),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				setFormValue(formValueDefault);
				navigate('/');
			} else {
				const data = await response.json();
				const errorMessage = data.error.message;
				switch (errorMessage) {
					case 'INVALID_PASSWORD':
						setError('Неверный пароль');
						break;
					case 'EMAIL_NOT_FOUND':
						setError('Неверный email');
						break;
					default:
						console.log(error);
				}
			}
		} catch (error) {
			setError('Серверная ошибка');
			console.log(error);
		}
	};

	const sendFixAuthorizationTime = async () => {
		try {
			await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json', {
				method: 'PATCH',
				body: JSON.stringify({ email, currentTime }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			setError('Серверная ошибка');
		}
	};

	const hundleSubmitAuthorization = async (e) => {
		e.preventDefault();
		await sendAuthorizationData();
		await sendFixAuthorizationTime();
	};

	return (
		<form className='formAuthorization' onSubmit={hundleSubmitAuthorization}>
			<FormControl sx={{ width: '100%' }}>
				<TextField size='small' label='Email' onChange={changeInput} value={email} name='email' type='email' required />
				<TextField
					variant='outlined'
					size='small'
					label='Пароль'
					onChange={changeInput}
					value={password}
					name='password'
					type='password'
					autoComplete='off'
					required
					sx={{ marginTop: '10px' }}
				/>
			</FormControl>
			<p className='text-danger'>{error}</p>
			<Button variant='contained' type='submit' autoComplete='off' sx={{ width: '30%' }}>
				отправить
			</Button>
		</form>
	);
}

export default AuthorizationForm;
