import { Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { errorMonitor } from 'events';
function App() {
	const formDefault = {
		email: 'user@mail.ru',
		password: '111111',
	};
	const [formValue, setFormValue] = useState(formDefault);
	const { email } = formValue;
	const { password } = formValue;
	const changeInput = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const authorizationResponse = async () => {
		try {
			const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
			const dbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
			const response = await fetch(`${dbUrl}${apiKey}`, {
				method: 'POST',
				body: JSON.stringify(formValue),
				headers: {
					'Content-Type': 'application/json',
				},
			});
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
	};

	return (
		<div>
			<Form onSubmit={authorizationResponse}>
				<FormControl onChange={changeInput} value={email} name='email'></FormControl>
				<FormControl onChange={changeInput} value={password} name='password'></FormControl>
				<Button variant='primary' onClick={authorizationResponse}>
					отправить
				</Button>
			</Form>
		</div>
	);
}

export default App;
