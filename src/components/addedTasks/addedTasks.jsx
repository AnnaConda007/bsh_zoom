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
import {
  deleteConference,
  updateConferenceInfo,
} from '../../../utils/manageConference.utils'
import { checkPastTime } from '../../../utils/currentTime.utils'
import { formatedDateToUTS } from '../../../utils/formatting.utils'
import { calculateDuration, compareStartEndMeeting } from '../../../utils/calculat.utils'
import { DisabledContext } from '../../contexts/disabled.context'
import { DatesContext } from '../../contexts/dates.context'
import {
  errorMessageForCompareErrorTime,
  errorMessageForPastTimeError,
} from '../../../contains'
import { updateAccesToken } from '../../../utils/getZoomData.utils'
import { limitErrorMessage } from '../../../contains'
const AddedTasks = ({ pulledTasks, setPulledTasks }) => {
  const [isEditingIndex, setisEditingIndex] = useState(null)
  const [editingValue, setEditingValue] = useState('')
  const { activeDate, setTaggedDates } = useContext(DatesContext)
  const { disabledDate, SetErrorExsist, SetErrorMessage } = useContext(DisabledContext)

  const upDateStartTime = async (timeStart, index) => {
    const checkPastTimeResponse = await checkPastTime(timeStart, activeDate)
    SetErrorExsist(checkPastTimeResponse)
    SetErrorMessage(errorMessageForPastTimeError)
    if (checkPastTimeResponse) return
    const compareResponse = compareStartEndMeeting(
      timeStart.$d,
      pulledTasks[index].timeEnd
    )
    SetErrorExsist(compareResponse)
    SetErrorMessage(errorMessageForCompareErrorTime)
    if (compareResponse) return
    const duration = calculateDuration(timeStart, pulledTasks[index].timeEnd)
    const id = pulledTasks[index].meetingId
    const newStartTimeValue = {
      duration: duration,
      start_time: formatedDateToUTS(timeStart, activeDate),
    }
    await updateConferenceInfo(id, newStartTimeValue, SetErrorExsist, SetErrorMessage)
  }

  const upDateEndTime = async (timeEnd, index) => {
    const compareResponse = compareStartEndMeeting(
      pulledTasks[index].timeStart,
      timeEnd.$d
    )
    SetErrorExsist(compareResponse)
    SetErrorMessage(errorMessageForCompareErrorTime)
    if (compareResponse) return
    const duration = calculateDuration(pulledTasks[index].timeStart, timeEnd)
    const id = pulledTasks[index].meetingId
    const newEndTimeValue = {
      duration: duration,
    }
    updateConferenceInfo(id, newEndTimeValue, SetErrorExsist, SetErrorMessage)
  }

  const handleEditBtn = (index) => {
    setisEditingIndex(index)
    setEditingValue(pulledTasks[index].taskValue)
  }

  const handleTaskInputChange = (newValue) => {
    setEditingValue(newValue)
  }

  const handleSaveEdit = async (index) => {
    const updatedTasks = [...pulledTasks]
    updatedTasks[index].taskValue = editingValue
    const id = pulledTasks[index].meetingId
    const newTopicValue = {
      topic: editingValue,
    }
    updateConferenceInfo(id, newTopicValue, SetErrorExsist, SetErrorMessage)
    setPulledTasks(updatedTasks)
    setisEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setisEditingIndex(null)
  }

  const handleDeleteBtn = async (index) => {
    const updatedTasks = pulledTasks.filter((_, i) => i !== index)
    const id = pulledTasks[index].meetingId
    const deleteConferenceRsponse = await deleteConference(
      id,
      SetErrorExsist,
      SetErrorMessage
    )
    console.log(deleteConferenceRsponse.status)
    if (deleteConferenceRsponse) return
    setPulledTasks(updatedTasks)
    if (index === isEditingIndex) {
      setisEditingIndex(null)
    }
    if (pulledTasks.length <= 1) {
      setTaggedDates((prevDates) => prevDates.filter((date) => date !== activeDate))
    }
  }

  const handleZoomBtn = (index) => {
    window.location.href = pulledTasks[index].meetingUrl
  }

  return (
    <>
      <FormControl className={styles.tasks}>
        {pulledTasks.map((task, index) => {
          return (
            <div
              className={styles.tasks__task}
              key={`${index}-${task.timeStart} ${task.timeEnd}`}
            >
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
