import { DateTime } from 'luxon'
import { formatedDateToUTS, formatTimeFromUTSToUnix } from './formatting.utils'
import { dataBaseUrl, crossingTimeMessage } from '../contains'

export const getcurrentTime = async () => {
  let currentTime
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Moscow')
    const data = await response.json()
    const dateTime = DateTime.fromISO(data.datetime).setZone('Europe/Moscow')
    const timestamp = Math.floor(dateTime.toSeconds())
    currentTime = timestamp || Math.floor(DateTime.local().toSeconds())
  } catch (error) {
    console.error('Error getting getcurrent time :', error)
  }
  return currentTime
}

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

export const checkMatchSlotTime = async (start, end, setErrorExsist, setErrorMessage) => {
  const getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const timeStart = Math.floor(new Date(start).getTime() / 1000)
  const timeEnd = Math.floor(new Date(end).getTime() / 1000)
  const checkMatchTimeArr = timeArr.filter((time) => {
    if (time >= timeStart && time <= timeEnd) {
      return false
    }

    return time >= timeStart && time <= timeEnd
  })
  return checkMatchTimeArr
}

export const setSlotTime = async (start, end) => {
  const getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const timeStart = Math.floor(new Date(start).getTime() / 1000)
  const timeEnd = Math.floor(new Date(end).getTime() / 1000)

  timeArr.push(timeStart)
  const minutDuration = (timeEnd - timeStart) / 60
  for (let i = 1; i <= minutDuration; i++) {
    const minut = timeStart + i * 60
    timeArr.push(minut)
  }
  return timeArr
}

export const checkMatchMettingTimeArr = async (
  start,
  end,
  setErrorExsist,
  setErrorMessage
) => {
  const checkRes = await checkMatchSlotTime(start, end, setErrorExsist, setErrorMessage)
  if (checkRes.length !== 0) {
    setErrorExsist(true)
    setErrorMessage(crossingTimeMessage)
  } else {
    const slotTime = await setSlotTime(start, end)
    await pushTimeSlot(slotTime)
     return true
  }
}

export const clearMettingTimeArr = async (start, end) => {
  console.log("start", start)
  let getTimeArr
  getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  let newTimeArr = []
  const timeStart = formatTimeFromUTSToUnix(start)
  console.log("timeStart", timeStart)

  const timeEnd = formatTimeFromUTSToUnix(end)

  timeArr.forEach((time) => {
    if (time < timeStart || time > timeEnd) {
      newTimeArr.push(time)
    }
  })

  await pushTimeSlot(newTimeArr)
  return true
}
const formateUTS_Unix = (time, activeDate) => {
   const utsTime = formatedDateToUTS(time, activeDate)
  const stringTime = utsTime.replace('T', ' ').replace('Z', '')
  const formatedtTme = DateTime.fromFormat(stringTime, 'yyyy-MM-dd HH:mm:ss')
   return formatedtTme
}

export const updateTimeSlots = async (
  obsoleteStart,
  newStart,
  end,
  activeDate,
  setErrorExsist,
  setErrorMessage
) => {
  const obsoleteTimeStartValue = formateUTS_Unix(obsoleteStart, activeDate)
  const newTimeStsrtValue = formateUTS_Unix(newStart, activeDate)
  const timeEnd = formateUTS_Unix(end, activeDate)

  const checkMatch = await checkMatchSlotTime(newTimeStsrtValue, timeEnd)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr(obsoleteTimeStartValue, timeEnd)
    const st = formatedDateToUTS(newStart, activeDate)
    const ed = formatedDateToUTS(end, activeDate)
    checkMatchMettingTimeArr(st, ed, setErrorExsist, setErrorMessage)
    return
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
