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
          //Root
          width: '100%',
          height: '100%',
          maxHeight: '700px',
          overflow: 'auto',
        },
        viewTransitionContainer: {
          // Главная обертка для календаря
          width: '100%',
          height: '100%',
          '& > div': {
            // Общая обертка для названия дней недели и календаря
            height: '100%',
            '& > div': {
              // Грид-
              height: '100%',
              '& > div:first-of-type': {
                // Название дней недели
                justifyContent: 'space-evenly',
                backgroundColor: '#dbdbeb', //!!!!!!заменить на primary
                '& > span': {
                  fontSize: '1rem',
                },
                '& > span[aria-label="суббота"]': { color: '#e58787' },
                '& > span[aria-label="воскресенье"]': { color: '#e58787' },
              },
              '& > div:last-child': {
                // Контейнер для дат
                height: '80%',
                marginTop: '30px',

                '& > div': {
                  // Промежуточный контейнер
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '& > div': {
                    justifyContent: 'space-evenly', // Контейнер для дней недели
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
    MuiTextField: {
      //
      styleOverrides: {
        root: {
          // Обводка вокруг input для ввода задач
          '& > div': {
            '& > fieldset': {
              border: 'none',
            },
          },
        },
      },
    },
  },
})
export default theme
