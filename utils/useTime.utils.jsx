import { DateTime } from 'luxon'
import { formatedDateToUTS } from './formatting.utils'
import { dataBaseUrl } from '../contains'
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

export const checkMatchMettingTimeArr = async (start, end) => {
  let getTimeArr
  getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const timeStart = Math.floor(new Date(start).getTime() / 1000)
  const timeEnd = Math.floor(new Date(end).getTime() / 1000)
  const checkMatchTimeArr = timeArr.some((time) => {
    return time >= timeStart && time <= timeEnd
  })
  if (!checkMatchTimeArr) {
    timeArr.push(timeStart)
    const minutDuration = (timeEnd - timeStart) / 60
    for (let i = 1; i <= minutDuration; i++) {
      const minut = timeStart + i * 60
      timeArr.push(minut)
    }
    await fetch(dataBaseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeArr),
    })
    return false
  } else {
    return true
  }
}

export const clearMettingTimeArr = async (start, end) => {
  let getTimeArr
  getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  let newTimeArr = []
  let dateStr = start
  let date = new Date(dateStr)
  const timeStart = Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ) / 1000
  )
  dateStr = end
  date = new Date(dateStr)
  const timeEnd = Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ) / 1000
  )
  timeArr.forEach((time) => {
    if (time < timeStart || time > timeEnd) {
      newTimeArr.push(time)
    }
  })
  await fetch(dataBaseUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTimeArr),
  })
  return true
}
