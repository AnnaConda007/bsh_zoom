import { Route, Routes } from 'react-router-dom';

import Authorization from '../routes/authorization/authorization.component';
import Home from '../routes/home/home.component';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='authorization' element={<Authorization />} />
    </Routes>
  );
}

export default App;
