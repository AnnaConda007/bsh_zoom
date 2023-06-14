import './index.styles.scss';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

const theme = createTheme({
	palette: {
		primary: {
			main: '#9a1ac1',
		},
	},
	components: {
		MuiDateCalendar: {
			styleOverrides: {
				root: {
					width: '100%',
					height: '100%',
				},
				viewTransitionContainer: {
					width: '100%',
					height: '100%',
				},
				'css-i5q14k-MuiDayCalendar-header': {
					justifyContent: 'space-evenly',
				},
				'css-flbe84-MuiDayCalendar-weekContainer': {
					justifyContent: 'space-evenly',
				},
				'css-v20sp3-MuiButtonBase-root-MuiPickersDay-root': {
					width: '70px',
					height: '70px',
					fontWeight: '400px',
					backgroundColor: 'red',
				},
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
