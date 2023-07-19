import { DateTime } from 'luxon'
import { formatedDateToUTS } from './formatting.utils'

export const getcurrentTime = async () => {
  let currentTime
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Moscow')
    const data = await response.json()
    const dateTime = DateTime.fromISO(data.datetime).setZone('Europe/Moscow')
    const timestamp = Math.floor(dateTime.toSeconds())
    currentTime = timestamp || Math.floor(DateTime.local().toSeconds())
  } catch (error) {
    console.error('Error getting getcurrent time :', error)
  }
  return currentTime
}

const f = 'lll'
export const checkPastDate = async (activeDate) => {
  const dateToUnix = (date) => {
    const dateString = DateTime.fromFormat(date, 'dd-MM-yyyy')
    const unixTimestamp = dateString.toSeconds()
    return unixTimestamp
  }
  const todaySecond = await getcurrentTime()
  const dateTime = DateTime.fromSeconds(todaySecond)
  const todayString = dateTime.toFormat('dd-MM-yyyy')
  const todayUnix = dateToUnix(todayString)
  const activeDateUnix = dateToUnix(activeDate)
  if (todayUnix > activeDateUnix) {
    return true
  } else {
    return false
  }
}

export const checkPastTime = async (time, activeDate) => {
  const curentUnixTime = await getcurrentTime()
  const curentReadableTime = DateTime.fromSeconds(curentUnixTime, {
    zone: 'Europe/Moscow',
  }).toFormat('yyyy-MM-dd HH:mm:ss')
  const stringCurrent = curentReadableTime.replace('T', ' ').replace('Z', '')
  const selectUTS = formatedDateToUTS(time, activeDate)
  const selectString = selectUTS.replace('T', ' ').replace('Z', '')
  const currentDateTime = DateTime.fromFormat(stringCurrent, 'yyyy-MM-dd HH:mm:ss')
  const selectDateTime = DateTime.fromFormat(selectString, 'yyyy-MM-dd HH:mm:ss')
  if (currentDateTime > selectDateTime) {
    return true
  } else {
    return false
  }
}
