import { formateTimeFromUTCtoHumanReadable } from './formatting.utils'
import { DateTime } from 'luxon'

export const calculatTimeEnd = (start, duraion) => {
  const startTime = DateTime.fromISO(start, { zone: 'utc' })
  const timeEnd = startTime.plus({ minutes: duraion })
  const dateStr = timeEnd.toFormat("yyyy-MM-dd'T'HH:mm:ss")
  return dateStr
}

export const calculateDuration = (timeStart, timeEnd) => {
  const diffInMilliseconds = new Date(timeEnd) - new Date(timeStart)
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60))
  return minutes
}

export const compareStartEndMeeting = (startTime, endTime) => {
  if (new Date(startTime) > new Date(endTime)) {
    return true
  } else {
    return false
  }
}
