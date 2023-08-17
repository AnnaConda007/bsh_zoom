import { useState, useContext } from 'react'
import { Badge } from '@mui/material'
import { pickersDay } from './pickersDay-style'
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Snackbar } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Header from '../header/header'
import ModalBox from '../modal/modal'
import { checkPastDate } from '../../utils/time.utils'
import { ErrorContext } from '../../contexts/error.context'
import { DatesContext } from '../../contexts/dates.context'
import useWebSocket from '../../hooks/useWebSocket'
import styles from './calendar.module.scss'
import { markMettingDates } from '../../hooks/markMettingDates'

const Calendar = () => {
  const [modal, setModal] = useState(false)
  const { setActiveDate, taggedDates } = useContext(DatesContext)
  const { setDisabledDate, setErrorExsist, errorExsist, errorMessage, autoHide } = useContext(ErrorContext)
  useWebSocket()
  markMettingDates()

  const handleDateClick = async (date) => {
    const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY')
    setActiveDate(formattedDate)
    const disabledDateDate = await checkPastDate(formattedDate)
    setDisabledDate(disabledDateDate)
    setModal(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setErrorExsist(false)
  }

  const slotProps = {
    day: (date) => {
      const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY')
      const isDateInArray = taggedDates.includes(formattedDate)
      return {
        onClick: () => handleDateClick(date),
        isDateInArray,
      }
    },
  }
  const ServerDay = (props) => {
    const { day, isDateInArray, ...other } = props
    return (
      <Badge key={day.toString()} overlap='circular' badgeContent={isDateInArray ? '🟢' : undefined}>
        <PickersDay {...other} day={day} sx={pickersDay} />
      </Badge>
    )
  }
  return (
    <div className={styles.wrap}>
      <Snackbar
        open={errorExsist}
        onClose={autoHide === true ? handleSnackbarClose : null}
        autoHideDuration={4000}
        message={errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <ModalBox modal={modal} setModal={setModal} />
      <Header />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
        <DateCalendar slots={{ day: ServerDay }} slotProps={slotProps} />
      </LocalizationProvider>
    </div>
  )
}

export default Calendar
