import { dateToNumber } from '../useTime.utils'
import { dataBaseUrl } from '../../contains'
export const checkMatchSlotTime = async (start, end) => {
  const getTimeSlotsResponse = await fetch(dataBaseUrl)
  const timeSlotsJSON = await getTimeSlotsResponse.json()
  const timeSlots = timeSlotsJSON || []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  const matchList = timeSlots.filter((time) => {
    return time >= timeStart && time <= timeEnd
  })
  return matchList
}

export const setSlotTime = async (start, end) => {
  const getTimeSlotsResponse = await fetch(dataBaseUrl)
  const timeSlotsJSON = await getTimeSlotsResponse.json()
  const timeSlots = timeSlotsJSON || []
  //console.log('получили слоты из БД', timeSlots)
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  timeSlots.push(timeStart)
  const minutDuration = (timeEnd - timeStart) / 60
  for (let i = 1; i <= minutDuration; i++) {
    const minut = timeStart + i * 60
    timeSlots.push(minut)
  }
  //console.log('отправили  слоты в БД', timeSlots)

  return timeSlots
}

export const processTimeSlot = async (start, end) => {
  const matchList = await checkMatchSlotTime(start, end)
  if (matchList.length === 0) {
    const slotTime = await setSlotTime(start, end)
    await pushTimeSlot(slotTime)
    return true
  } else {
    return false
  }
}

export const pushTimeSlot = async (data) => {
  const res = await fetch(dataBaseUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}
