import { DateTime } from 'luxon'

export const getcurrentTime = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Moscow')
    const responseJSON = await response.json()
    const dateTime = DateTime.fromISO(responseJSON.datetime).setZone('Europe/Moscow')
    return Math.floor(dateTime.toSeconds())
  } catch (error) {
    console.error('Error getting getcurrent time :', error)
  }
}

export const checkPastDate = async (activeDate) => {
  const moskowTime = await getcurrentTime()
  const MoskowTimeFormated = DateTime.fromSeconds(moskowTime).toFormat('dd-MM-yyyy')
  if (DateTime.fromFormat(MoskowTimeFormated, 'dd-MM-yyyy') > DateTime.fromFormat(activeDate, 'dd-MM-yyyy')) {
    return true
  } else {
    return false
  }
}

export const checkPastTime = async (time) => {
  const userDateTime = DateTime.fromISO(time, { zone: 'UTC' })
  const moscowTimeWithSameLocalTime = DateTime.fromObject({
    year: userDateTime.year,
    month: userDateTime.month,
    day: userDateTime.day,
    hour: userDateTime.hour,
    minute: userDateTime.minute,
    second: userDateTime.second,
  }).setZone('Europe/Moscow', { keepLocalTime: true })
  const mosdcowTime = await getcurrentTime()
  if (mosdcowTime > moscowTimeWithSameLocalTime.toSeconds()) {
    return true
  } else {
    return false
  }
}
export const dateToNumber = (date) => {
  const number = Math.floor(new Date(date).getTime() / 1000)
  return number
}

export const calculatTimeEnd = (start, duraion) => {
  const startTime = DateTime.fromISO(start, { zone: 'utc' })
  const timeEnd = startTime.plus({ minutes: duraion })
  const dateStr = timeEnd.toFormat("yyyy-MM-dd'T'HH:mm:ss")
  return dateStr
}

export const calculateDuration = ({ timeStart, timeEnd }) => {
  const diffInMilliseconds = new Date(timeEnd) - new Date(timeStart)
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60))
  return minutes
}

export const compareStartEndMeeting = ({ startTime, endTime }) => {
  if (new Date(startTime) > new Date(endTime)) {
    return true
  } else {
    return false
  }
}
