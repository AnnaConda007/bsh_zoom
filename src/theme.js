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
            // общая обертка для названия дней недели и календаря
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
                  },
                },
              },
            },
          },
        },
      },
    },
    MuiTextField: { // 
      styleOverrides: {
        root: { // обводка вокруг input для ввода задач
          '& > div':{
            '& > fieldset':{
                border:"none"
               } 
          }
           
        },
      },
    },
  },
})
export default theme
