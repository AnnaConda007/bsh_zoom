import { checkPastTime, compareStartEndMeeting } from './useTime.utils'
import { errorMessageForPastTimeError, crossingTimeMessage, errorMessageForCompareErrorTime, disabledMeeting } from '../contains'
import { updateStartTimeSlots } from './slots/upDateSlots.utils'
import { formatedDateToUTS } from './formatting.utils'
import { processTimeSlot } from './slots/addSlots.utils'

export const preLaunchCheckUpdateStartTime = async ({ timeStart, index, setErrorExsist, setErrorMessage, tasksForActiveDate, activeDate }) => {
  const taskСreator = localStorage.getItem('email')
  if (taskСreator !== tasksForActiveDate[index].creator) {
    setErrorExsist(true)
    setErrorMessage(disabledMeeting)
    return false
  }
  const checkPastTimeResponse = await checkPastTime(formatedDateToUTS(timeStart, activeDate))
  if (checkPastTimeResponse) {
    setErrorExsist(true)
    setErrorMessage(errorMessageForPastTimeError)
    return false
  }
  const startLessEnd = compareStartEndMeeting({ startTime: timeStart.$d, endTime: tasksForActiveDate[index].timeEnd })
  if (startLessEnd) {
    setErrorExsist(true)
    setErrorMessage(errorMessageForCompareErrorTime)
    return false
  }
  const updateStartTimeSlotsResponse = await updateStartTimeSlots({
    obsoleteStart: `${tasksForActiveDate[index].timeStart}Z`,
    start: formatedDateToUTS(timeStart, activeDate),
    end: `${tasksForActiveDate[index].timeEnd}Z`,
    taskСreator,
    taskEditor: tasksForActiveDate[index].creator,
  })
  if (!updateStartTimeSlotsResponse) {
    setErrorExsist(true)
    setErrorMessage(crossingTimeMessage)
    return false
  }
  return true
}

export const preLaunchCheckCreateMeet = async (timeStart, timeEnd, newTaskObj, setErrorExsist, setErrorMessage) => {
  const startLessEnd = compareStartEndMeeting({ startTime: timeStart, endTime: timeEnd })
  if (startLessEnd) {
    setErrorExsist(true)
    setErrorMessage(errorMessageForCompareErrorTime)
    return true
  }

  if (newTaskObj.taskValue.trim() === '' || newTaskObj.timeStart === '' || newTaskObj.timeEnd === '') {
    return true
  }
  const createTimeSlot = await processTimeSlot(timeStart, timeEnd)
  if (!createTimeSlot) {
    setErrorExsist(true)
    setErrorMessage(crossingTimeMessage)
    return true
  }
}
