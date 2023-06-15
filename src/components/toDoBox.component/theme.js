import { createTheme } from '@mui/material/styles';

const theme = createTheme({
		palette: {
			primary: {
				main: '#dbdbeb',
			},
		},
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						'& > div': {
							border: '1px solid',
						},
					},
				},
			},
		},
	});

  export default theme