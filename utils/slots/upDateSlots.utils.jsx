import { dateToNumber } from '../useTime.utils'
import { checkMatchSlotTime, processTimeSlot, pushTimeSlot, setSlotTime } from './addSlots.utils'
import { dataBaseUrl } from '../../contains'

export const clearMettingTimeArr = async ({ start, end }) => {
  let getTimeSlotsResponse = await fetch(dataBaseUrl)
  const timeSlotsJSON = await getTimeSlotsResponse.json()
  const timeSlots = timeSlotsJSON || []
  const newTimeSlot = []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  timeSlots.forEach((time) => {
    if (time < timeStart || time > timeEnd) {
      newTimeSlot.push(time)
    }
  })
  console.log('отправлено при удлании', newTimeSlot)
  await pushTimeSlot(newTimeSlot)
  return true
}

export const updateStartTimeSlots = async ({ obsoleteStart, start, end, taskСreator, taskEditor }) => {
  const checkMatch = await checkMatchSlotTime(start, end)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    await processTimeSlot(start, end)
    return true
  }
  const startObsoleteNum = dateToNumber(obsoleteStart)
  const endNum = dateToNumber(end)
  const matchList = checkMatch.filter((time) => {
    return time < startObsoleteNum || time > endNum
  })
  if (matchList.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    const clots = await setSlotTime(start, end)
    await pushTimeSlot(clots)
    //await processTimeSlot(start, end)
    return true
  }
}

export const updateEndTimeSlots = async ({ start, obsoleteEnd, end, taskСreator, taskEditor }) => {
  const checkMatch = await checkMatchSlotTime(start, end)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    await processTimeSlot(start, end)
    return true
  }
  const startNum = dateToNumber(start)
  const obsoletEndNum = dateToNumber(obsoleteEnd)
  const matchList = checkMatch.filter((time) => {
    return time < startNum || time > obsoletEndNum
  })
  if (matchList.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    const clots = await setSlotTime(start, end)
    await pushTimeSlot(clots)
    return true
  }
}
