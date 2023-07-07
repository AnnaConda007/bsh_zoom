import './index.styles.scss';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { Providers } from './contexts/providers';
ReactDOM.createRoot(document.getElementById('root')).render(
	//	<React.StrictMode>
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Providers>
				<App />
			</Providers>
		</ThemeProvider>
	</BrowserRouter>
	//	</React.StrictMode>
);
