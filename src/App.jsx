import { Route, Routes } from 'react-router-dom';
import Authorization from '../routes/authorization/authorization.component';
import Home from '../routes/home/home.component';
import { Providers } from './contexts/providers';
function App() {
	return (
		<Providers>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='authorization' element={<Authorization />} />
			</Routes>
		</Providers>
	);
}

export default App;
