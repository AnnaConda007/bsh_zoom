import { Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';

function Authorization() {
	const formDefault = {
		email: 'user@mail.ru',
		password: '111111',
	};
	const [formValue, setFormValue] = useState(formDefault);
	let { email, password } = formValue;
	const changeInput = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const authorizationResponse = async (e) => {
		e.preventDefault();
		try {
			const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
			const authorizationUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
			const response = await fetch(`${authorizationUrl}${apiKey}`, {
				method: 'POST',
				body: JSON.stringify(formValue),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response);
			if (!response.ok) {
				const data = await response.json();
				const errorMessage = data.error.message;
				console.log(errorMessage);
				switch (errorMessage) {
					case 'INVALID_PASSWORD':
						alert('Неверный пароль');
						break;
					case 'EMAIL_NOT_FOUND':
						alert('Неверный email');
						break;
					default:
						console.log(error);
				}
			}
		} catch (error) {
			throw new Error(error);
		}
		{
		}
		const currentTime = Math.floor(Date.now() / 1000);
		await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json', {
			method: 'POST',
			body: JSON.stringify({ email, currentTime }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};
	return (
		<Form className='d-flex flex-column align-items-center w-50' onSubmit={authorizationResponse}>
			<FormControl placeholder='Email' onChange={changeInput} value={email} name='email' type='email' />
			<FormControl
				placeholder='Пароль'
				className='m-2'
				onChange={changeInput}
				value={password}
				name='password'
				type='password'
			/>
			<Button className='m-2' variant='primary' type='submit'>
				отправить
			</Button>
		</Form>
	);
}

export default Authorization;
