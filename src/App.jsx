import { Route, Routes } from 'react-router-dom';
import { ActiveDateProvider } from './contexts/activeDateContext';
import Authorization from '../routes/authorization/authorization.component';
import Home from '../routes/home/home.component';
function App() {
	return (
		<ActiveDateProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='authorization' element={<Authorization />} />
			</Routes>
		</ActiveDateProvider>
	);
}

export default App;
