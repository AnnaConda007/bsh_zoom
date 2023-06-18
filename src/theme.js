import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    primary: {
      main: '#dbdbeb',
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
              '& > div:first-of-type': {
                // название дней недели
                justifyContent: 'space-evenly',
                backgroundColor: '#dbdbeb', //!!!!!!заменить на primary
                '& > span': {
                  fontSize: '1rem',
                },
                '& > span[aria-label="суббота"]': { color: '#e58787' },
                '& > span[aria-label="воскресенье"]': { color: '#e58787' },
              },
              '& > div:last-child': {
                // контейнер для дат
                height: '80%',
                marginTop: '30px',

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
                    '& > button[aria-colindex="6"]': {
                      color: '#e58787',
                    },
                    '& > button[aria-colindex="7"]': {
                      color: '#e58787',
                    },
                    '& > button[aria-selected="true"]': {
                      backgroundColor: '#dbdbeb',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
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
})
export default theme
