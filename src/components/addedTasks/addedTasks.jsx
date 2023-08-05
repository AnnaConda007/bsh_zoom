import { useState, useContext } from 'react'
import { TextField, FormControl } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelIcon from '@mui/icons-material/Cancel'
import VideocamIcon from '@mui/icons-material/Videocam'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import styles from './addedTasks.module.scss'
import { deleteConference, updateConferenceInfo } from '../../../utils/manageConference.utils'
import { calculateDuration, compareStartEndMeeting } from '../../../utils/useTime.utils'
import { formatedDateToUTS } from '../../../utils/formatting.utils'
import { ErrorContext } from '../../contexts/error.context'
import { DatesContext } from '../../contexts/dates.context'
import { errorMessageForCompareErrorTime, disabledMeeting } from '../../../contains'
import { preLaunchCheckUpdateStartTime } from '../../../utils/check.utils'
import { clearMettingTimeArr } from '../../../utils/slots/upDateSlots.utils'
const AddedTasks = ({ tasksForActiveDate, setTasksForActiveDate }) => {
  const [isEditingIndex, setisEditingIndex] = useState(null)
  const [editingValue, setEditingValue] = useState('')
  const { activeDate, setTaggedDates } = useContext(DatesContext)
  const { disabledDate, setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const taskCreator = localStorage.getItem('email')

  const upDateStartTime = async (timeStart, index) => {
    const checkResponse = await preLaunchCheckUpdateStartTime({
      timeStart,
      index,
      setErrorExsist,
      setErrorMessage,
      tasksForActiveDate,
      activeDate,
    })
    if (checkResponse) return
    const duration = calculateDuration(timeStart, tasksForActiveDate[index].timeEnd)
    const meetingId = tasksForActiveDate[index].meetingId
    const newStartTimeValue = {
      duration: duration,
      start_time: formatedDateToUTS(timeStart, activeDate),
    }
    await updateConferenceInfo({ meetingId, newStartTimeValue, setErrorExsist, setErrorMessage })
  }

  const upDateEndTime = async (timeEnd, index) => {
    const compareResponse = compareStartEndMeeting({ startTime: tasksForActiveDate[index].timeStart, endTime: timeEnd.$d })
    setErrorExsist(compareResponse)
    setErrorMessage(errorMessageForCompareErrorTime)
    if (compareResponse) return
    const duration = calculateDuration({ timeStart: tasksForActiveDate[index].timeStart, timeEnd })
    const meetingId = tasksForActiveDate[index].meetingId
    const newEndTimeValue = {
      duration: duration,
    }
    updateConferenceInfo({ meetingId, newEndTimeValue, setErrorExsist, setErrorMessage })
  }

  const handleEditBtn = (index) => {
    setisEditingIndex(index)
    setEditingValue(tasksForActiveDate[index].taskValue)
  }

  const handleTaskInputChange = (newValue) => {
    setEditingValue(newValue)
  }

  const handleSaveEdit = async (index) => {
    const updatedTasks = [...tasksForActiveDate]
    updatedTasks[index].taskValue = editingValue
    const meetingId = tasksForActiveDate[index].meetingId
    const newTopicValue = {
      topic: editingValue,
    }
    updateConferenceInfo({ meetingId, newTopicValue, setErrorExsist, setErrorMessage })
    setTasksForActiveDate(updatedTasks)
    setisEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setisEditingIndex(null)
  }

  const handleDeleteBtn = async (index) => {
    if (taskCreator !== tasksForActiveDate[index].creator) {
      setErrorExsist(true)
      setErrorMessage(disabledMeeting)
      return
    }
    const updatedTasks = tasksForActiveDate.filter((_, i) => i !== index)
    const meetingId = tasksForActiveDate[index].meetingId
    const startTime = tasksForActiveDate[index].timeStart
    const startEnd = tasksForActiveDate[index].timeEnd
    const deleteConferenceRsponse = await deleteConference({ meetingId, setErrorExsist, setErrorMessage, startTime, startEnd })
    if (deleteConferenceRsponse.status === 200) return
    setTasksForActiveDate(updatedTasks)
    if (index === isEditingIndex) {
      setisEditingIndex(null)
    }
    if (tasksForActiveDate.length <= 1) {
      setTaggedDates((prevDates) => prevDates.filter((date) => date !== activeDate))
    }
  }

  const handleZoomBtn = (index) => {
    window.location.href = tasksForActiveDate[index].meetingUrl
  }

  return (
    <>
      <FormControl className={styles.tasks}>
        {tasksForActiveDate.map((task, index) => {
          return (
            <div className={styles.tasks__task} key={`${index}-${task.timeStart} ${task.timeEnd}`}>
              <span className={styles.tasks__user}>Организатор: {task.creator}</span>
              <TextField
                sx={{ border: '1px solid', borderRadius: '5px' }}
                className={styles.planner__textField}
                multiline={true}
                value={isEditingIndex === index ? editingValue : task.taskValue}
                onChange={(e) => {
                  if (isEditingIndex === index) {
                    handleTaskInputChange(e.target.value)
                  }
                }}
                type='text'
                InputProps={{
                  endAdornment: (
                    <>
                      <div className={styles.tasks__add__time}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            closeOnSelect={false}
                            label='начало'
                            ampm={false}
                            autoOk={false}
                            orientation='landscape'
                            disabled={disabledDate}
                            value={dayjs(task.timeStart)}
                            onChange={(time) => {
                              upDateStartTime(time, index)
                            }}
                          />
                          <TimePicker
                            label='конец'
                            ampm={false}
                            disabled={disabledDate}
                            value={dayjs(task.timeEnd)}
                            onChange={(time) => {
                              upDateEndTime(time, index)
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </>
                  ),
                }}
              />
              <div className={styles.tasks_btns}>
                <button>
                  <VideocamIcon
                    sx={{ color: 'blue' }}
                    onClick={() => {
                      handleZoomBtn(index)
                    }}
                  />
                </button>
                <button>
                  <DeleteForeverIcon
                    onClick={() => {
                      handleDeleteBtn(index)
                    }}
                  />
                </button>
                {isEditingIndex === index ? (
                  <>
                    <button>
                      <CheckCircleOutlineIcon onClick={() => handleSaveEdit(index)} />
                    </button>
                    <button>
                      <CancelIcon onClick={handleCancelEdit} />
                    </button>
                  </>
                ) : (
                  <button>
                    <ModeEditIcon onClick={() => handleEditBtn(index)} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </FormControl>
    </>
  )
}

export default AddedTasks
