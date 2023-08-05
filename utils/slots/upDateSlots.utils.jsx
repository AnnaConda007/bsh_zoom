import { dateToNumber } from '../useTime.utils'
import { checkMatchSlotTime, processTimeSlot, pushTimeSlot } from './addSlots.utils'
import { dataBaseUrl } from '../../contains'

export const clearMettingTimeArr = async ({ start, end }) => {
  let getTimeSlotsResponse = await fetch(dataBaseUrl)
  const timeSlotsJSON = await getTimeSlotsResponse.json()
  const timeSlots = timeSlotsJSON || []
 // console.log('получили слоты из бд для удаления', timeSlots)
  const newTimeSlot = []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  timeSlots.forEach((time) => {
    if (time < timeStart || time > timeEnd) {
      newTimeSlot.push(time)
    }
  })
  await pushTimeSlot(newTimeSlot)
  return true
}

export const updateStartTimeSlots = async ({ obsoleteStart, start, end, taskСreator, taskEditor }) => {
  const checkMatch = await checkMatchSlotTime(start, end)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    processTimeSlot(start, end)
    return true
  }
  const startObsoleteNum = dateToNumber(obsoleteStart)
  const endNum = dateToNumber(end)
  const matchList = checkMatch.filter((time) => {
    if (time >= startObsoleteNum && time <= endNum && taskСreator === taskEditor) {
      return false
    }
    return (time <= startObsoleteNum && time >= endNum) || (time >= startObsoleteNum && time <= endNum)
  })
  if (matchList.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    processTimeSlot(start, end)
    return true
  }
}

export const updateEndTimeSlots = async ({ start, obsoleteEnd, end, taskСreator, taskEditor }) => {
  const checkMatch = await checkMatchSlotTime(start, end)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    processTimeSlot(start, end)
    return true
  }
  const startNum = dateToNumber(start)
  const EndObsoleteNum = dateToNumber(obsoleteEnd)

  const matchList = checkMatch.filter((time) => {
    if (time >= startNum && time <= EndObsoleteNum && taskСreator === taskEditor) {
      return false
    }
    return (time <= startNum && time >= EndObsoleteNum) || (time >= start && time <= EndObsoleteNum)
  })
  if (matchList.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    processTimeSlot(start, end)
    return true
  }
}
