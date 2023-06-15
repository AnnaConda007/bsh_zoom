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
					//root
					width: '100%',
					height: '100%',
					maxHeight: '700px',
					overflow: 'auto',
				},
				viewTransitionContainer: {
					// главная обертка для календаря
					width: '100%',
					height: '100%',
					'& > div': {
						// общая бертка для названия дней недели и календаря
						height: '100%',
						'& > div': {
							// грид-
							height: '100%',
							'& > div:first-child': {
								// название дней недели
								justifyContent: 'space-evenly',
								backgroundColor: 'blue', //!!!!заменить на primary
								'& > span': {
									fontSize: '1rem',
								},
							},
							'& > div:last-child': {
								// контейнер для дат
								height: '80%',
								marginTop: '30px',
								backgroundColor: 'blue', //!!!!заменить на primary

								'& > div': {
									// промежуточный контейнер
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									'& > div': {
										justifyContent: 'space-evenly', // контейнер для дней недели
										'& > button': {
											fontWeight: '800',
											fontSize: '1rem',
										},
									},
								},
							},
						},
					},
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
