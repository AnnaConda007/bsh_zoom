import { Routes, Route } from 'react-router-dom';

import Authorization from '../routes/authorization/authorization.component';
function App() {
	return (
		<Routes>
			<Route path='/' element={<Authorization />}></Route>
		</Routes>
	);
}

export default App;
