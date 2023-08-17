import { TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useState, useContext } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import styles from './addNewTask.module.scss'
import { formatedDateToUTS } from '../../utils/formatting.utils'
import { checkPastTime, compareStartEndMeeting } from '../../utils/time.utils'
import { createMeet } from '../../utils/manageConference.utils'
import { ErrorContext } from '../../contexts/error.context'
import { DatesContext } from '../../contexts/dates.context'
import { TasksContext } from '../../contexts/tasks.context'
import { processAndPushTimeSlot } from '../../utils/slots/addSlots.utils'

const AddNewTask = ({  setTasksForActiveDate }) => {
  const defaultTask = { taskValue: '', timeStart: '', timeEnd: '', meetingUrl: '' }
  const [newTaskObj, setNewTaskObj] = useState(defaultTask)
  const { activeDate, taggedDates, setTaggedDates } = useContext(DatesContext)
  const { disabledDate, setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { conferenceTopic, setConferenceTopic, timeStart, setTimeStart, timeEnd, setTimeEnd } = useContext(TasksContext)

  const fullnessTimeForNewTask = async (selectedTime, timeKey) => {
    const date = formatedDateToUTS(selectedTime, activeDate)
    await checkPastTime({ date, setErrorExsist, setErrorMessage })
    setNewTaskObj((prevTask) => ({
      ...prevTask,
      [timeKey]: selectedTime,
    }))
    if (timeKey === 'timeStart') {
      setTimeStart(date)
    }
    if (timeKey === 'timeEnd') {
      setTimeEnd(date)
    }
  }

  const fullnessValueForNewTask = async (value) => {
    setNewTaskObj((prevTask) => ({
      ...prevTask,
      taskValue: value,
    }))
    setConferenceTopic(value)
  }

  const handleAddTaskBtn = async () => {
    const startLessEnd = compareStartEndMeeting({ startTime: timeStart, endTime: timeEnd, setErrorExsist, setErrorMessage })
    if (startLessEnd) return
    if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') return
    const succesCeateTimeSlot = await processAndPushTimeSlot({ timeStart, timeEnd, setErrorExsist, setErrorMessage })
    if (!succesCeateTimeSlot) return
    const createMeetReponse = await createMeet({ conferenceTopic, timeStart, timeEnd, setErrorExsist, setErrorMessage })
    if (!createMeetReponse) return
    setTasksForActiveDate((prevTasks) => [...prevTasks, newTaskObj])
    setNewTaskObj(defaultTask)
    if (!taggedDates.includes(activeDate)) {
      setTaggedDates((prevDates) => [...prevDates, activeDate])
    }
  }

  return (
    <>
      <div className={styles.newTask}>
        <TextField
          sx={{ border: '1px solid', borderRadius: '5px' }}
          className={styles.newTask__textField}
          multiline={true}
          onChange={(e) => {
            fullnessValueForNewTask(e.target.value)
          }}
          value={newTaskObj.taskValue}
          InputProps={{
            endAdornment: (
              <div className={styles.newTask__time}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label='начало'
                    ampm={false}
                    value={newTaskObj.timeStart}
                    onChange={(time) => {
                      fullnessTimeForNewTask(time, 'timeStart')
                    }}
                  />
                  <TimePicker
                    label='конец'
                    value={newTaskObj.timeEnd}
                    ampm={false}
                    onChange={(time) => {
                      fullnessTimeForNewTask(time, 'timeEnd')
                    }}
                  />
                </LocalizationProvider>
              </div>
            ),
          }}
        />

        {disabledDate === false && (
          <button>
            <AddCircleOutlineIcon onClick={handleAddTaskBtn} />
          </button>
        )}
      </div>
    </>
  )
}

export default AddNewTask
