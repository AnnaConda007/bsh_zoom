import { dateToNumber } from '../useTime.utils'
import { getMatchingTimeSlots, pushTimeSlot, generateTimeSlotsInRange, getTimeSlots } from './addSlots.utils'

export const clearMettingTimeArr = async ({ start, end }) => {
  try {
    const timeSlots = await getTimeSlots()
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
  } catch (error) {
    console.error('Ошибка обработки или получения данных ', error)
  }
}

export const updateStartTimeSlots = async ({ obsoleteStart, start, end }) => {
  const timeSlots = await getTimeSlots()
  const matchingTimeSlots = await getMatchingTimeSlots(timeSlots, start, end)
  if (matchingTimeSlots.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    const newtimeSlotsJSON = await getTimeSlots()
    const newTimeSlots = await generateTimeSlotsInRange(newtimeSlotsJSON, start, end)
    await pushTimeSlot(newTimeSlots)
    return true
  }
  const startObsoleteNum = dateToNumber(obsoleteStart)
  const endNum = dateToNumber(end)
  const matchListOutsideOfObsoleteInterval = matchingTimeSlots.filter((time) => {
    return time < startObsoleteNum || time > endNum
  })
  if (matchListOutsideOfObsoleteInterval.length === 0) {
    await clearMettingTimeArr({ start: obsoleteStart, end: end })
    const timeSlotsAfterDeletion = await getTimeSlots()
    const newTimeSlots = await generateTimeSlotsInRange(timeSlotsAfterDeletion, start, end)
    await pushTimeSlot(newTimeSlots)
    return true
  }
}

export const updateEndTimeSlots = async ({ start, obsoleteEnd, end }) => {
  const timeSlots = await getTimeSlots()
  const matchingTimeSlots = await getMatchingTimeSlots(timeSlots, start, end)
  if (matchingTimeSlots.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    const newtimeSlots = await getTimeSlots()
    const newTimeSlots = await generateTimeSlotsInRange(newtimeSlots, start, end)
    await pushTimeSlot(newTimeSlots)
  }
  const startNum = dateToNumber(start)
  const obsoletEndNum = dateToNumber(obsoleteEnd)
  const matchListOutsideOfObsoleteInterval = matchingTimeSlots.filter((time) => {
    return time < startNum || time > obsoletEndNum
  })
  if (matchListOutsideOfObsoleteInterval.length === 0) {
    await clearMettingTimeArr({ start: start, end: obsoleteEnd })
    const timeSlotsAfterDeletion = (await getTimeSlots()) || []
    const newTimeSlots = await generateTimeSlotsInRange(timeSlotsAfterDeletion, start, end)
    await pushTimeSlot(newTimeSlots)
    return true
  }
}
