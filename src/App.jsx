import { Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
function App() {
	const formDefault = {
		email: '+',
		password: '/',
	};
	const [formValue, setFormValue] = useState(formDefault);
	const { email } = formValue;
	const { password } = formValue;
	const changeInput = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
		console.log(formValue);
	};

	return (
		<div>
			<Form>
				<FormControl onChange={changeInput} value={email} name='email'></FormControl>
				<FormControl onChange={changeInput} value={password} name='password'></FormControl>
				<Button variant='primary'>отправить</Button>
			</Form>
		</div>
	);
}

export default App;
