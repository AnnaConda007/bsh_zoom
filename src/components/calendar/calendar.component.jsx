import { useEffect, useState, useContext } from 'react'
import { Badge } from '@mui/material'
import { pickersDay } from './pickersDay-style'
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Snackbar } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Header from '../header/header'
import ModalBox from '../modal/modal'
import { getTaggedDate } from '../../../utils/getZoomData.utils'
import { homeUrL } from '../../../contains'
import { getZoomTokens, getConferenceInfo } from '../../../utils/getZoomData.utils'
import { checkPastDate } from '../../../utils/currentTime.utils'
import { DisabledContext } from '../../contexts/disabled.context'
import { DatesContext } from '../../contexts/dates.context'
import { TaskInfoContext } from '../../contexts/taskInfo.context'
import styles from './calendar.module.scss'
const Calendar = () => {
  const { setTasksForActiveDate } = useContext(TaskInfoContext)
  const { activeDate } = useContext(DatesContext)
  const [modal, setModal] = useState(false)
  const { setActiveDate, taggedDates, setTaggedDates } = useContext(DatesContext)
  const { setDisabledDate, setErrorExsist, setErrorMessage, errorExsist, errorMessage } =
    useContext(DisabledContext)
  let ws = new WebSocket('ws://localhost:3001')
  ws.onmessage = () => {
    const getDates = async () => {
      try {
        setTaggedDates(await getTaggedDate(setErrorExsist, setErrorMessage))
      } catch (error) {
        console.error('Ошибка при попытке получения TaggedDates ', error)
      }
    }
    getDates()

    const getTask = async () => {
      if (!activeDate) return
      try {
        const task = await getConferenceInfo(activeDate, setErrorExsist, setErrorMessage)
        setTasksForActiveDate(task)
      } catch (error) {
        console.error(
          'Ошибка при попытке получения информации о конференциях на выбранную дату ',
          error
        )
      }
    }
    getTask()
  }
  ws.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }

  useEffect(() => {
    const getTokens = async () => {
      await getZoomTokens(homeUrL, setErrorExsist, setErrorMessage)
    }
    getTokens()

    const getDates = async () => {
      try {
        setTaggedDates(await getTaggedDate(setErrorExsist, setErrorMessage))
      } catch (error) {
        console.error('Ошибка при попытке получения TaggedDates ', error)
      }
    }
    getDates()
  }, [])

  const handleDateClick = async (date) => {
    const formattedDate = dayjs(date.day.$d).format('DD-MM-YYYY')
    setActiveDate(formattedDate)
    const disabledDateDate = await checkPastDate(formattedDate)
    setDisabledDate(disabledDateDate)
    setModal(true)
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setErrorExsist(false)
  }
  const ServerDay = (props) => {
    const { day, isDateInArray, ...other } = props
    return (
      <Badge
        key={day.toString()}
        overlap='circular'
        badgeContent={isDateInArray ? '🟢' : undefined}
      >
        <PickersDay {...other} day={day} sx={pickersDay} />
      </Badge>
    )
  }
  return (
    <div className={styles.wrap}>
      <Snackbar
        open={errorExsist}
        onClose={handleSnackbarClose}
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
