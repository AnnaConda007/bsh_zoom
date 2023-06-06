import { Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
function App() {
	const formDefault = {
		email: '',
		password: '',
	};
	const [formValue, setFormValue] = useState(formDefault);
	const { email } = formValue;
	const { password } = formValue;
	const changeInput = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const authorizationResponse = async () => {
		const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
		const dbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
		const response = await fetch(`${dbUrl}${apiKey}`, {
			method: 'POST',
			body: JSON.stringify(formValue),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(response);
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
