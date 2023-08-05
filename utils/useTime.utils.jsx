import { DateTime } from 'luxon'
import { formatedDateToUTS, formatTimeFromUTSToUnix } from './formatting.utils'
import { dataBaseUrl, crossingTimeMessage } from '../contains'

export const getcurrentTime = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Moscow')
    const responseJSON = await response.json()
    const dateTime = DateTime.fromISO(responseJSON.datetime).setZone('Europe/Moscow')
    const dateStr = dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
    const moskowTime = Math.floor(new DateTime(dateStr) / 1000)
    return moskowTime
  } catch (error) {
    console.error('Error getting getcurrent time :', error)
  }
}

export const checkPastDate = async (activeDate) => {
  const moskowTime = await getcurrentTime()
  const MoskowTimeFormated = DateTime.fromSeconds(moskowTime).toFormat('dd-MM-yyyy')
  if (
    DateTime.fromFormat(MoskowTimeFormated, 'dd-MM-yyyy') >
    DateTime.fromFormat(activeDate, 'dd-MM-yyyy')
  ) {
    return true
  } else {
    return false
  }
}

export const checkPastTime = async (time) => {
  const moskowTime = await getcurrentTime()
  const selectedTime = Math.floor(DateTime.fromISO(time.replace('Z', '')) / 1000)
  if (moskowTime > selectedTime) {
    return true
  } else {
    return false
  }
}

const dateToNumber = (date) => {
  const number = Math.floor(new Date(date).getTime() / 1000)
  return number
}

export const checkMatchSlotTime = async (start, end) => {
  const getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  const checkMatchTimeArr = timeArr.filter((time) => {
    return time >= timeStart && time <= timeEnd
  })
  return checkMatchTimeArr
}

export const setSlotTime = async (start, end) => {
  const getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  timeArr.push(timeStart)
  const minutDuration = (timeEnd - timeStart) / 60
  for (let i = 1; i <= minutDuration; i++) {
    const minut = timeStart + i * 60
    timeArr.push(minut)
  }
  return timeArr
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

export const clearMettingTimeArr = async (start, end) => {
  let getTimeArr = await fetch(dataBaseUrl)
  const timeArrJSon = await getTimeArr.json()
  const timeArr = timeArrJSon || []
  const newTimeArr = []
  const timeStart = dateToNumber(start)
  const timeEnd = dateToNumber(end)
  timeArr.forEach((time) => {
    if (time < timeStart || time > timeEnd) {
      newTimeArr.push(time)
    }
  })
  await pushTimeSlot(newTimeArr)
  return true
}

export const updateTimeSlots = async (
  obsoleteStart,
  newStart,
  end,
  setErrorExsist,
  setErrorMessage,
  taskСreator,
  taskEditor
) => {
  const checkMatch = await checkMatchSlotTime(newStart, end)
  if (checkMatch.length === 0) {
    await clearMettingTimeArr(obsoleteStart, end)
    processTimeSlot(newStart, end, setErrorExsist, setErrorMessage)
    return true
  }
  const timebsoleteStart = dateToNumber(obsoleteStart)
  const timeEnd = dateToNumber(end)
  const newTime = checkMatch.filter((time) => {
    if (time >= timebsoleteStart && time <= timeEnd && taskСreator === taskEditor) {
      return false
    }
    return (
      (time <= timebsoleteStart && time >= timeEnd) ||
      (time >= timebsoleteStart && time <= timeEnd)
    )
  })
  if (newTime.length === 0) {
    await clearMettingTimeArr(obsoleteStart, end)
    processTimeSlot(newStart, end, setErrorExsist, setErrorMessage)
    return true
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
