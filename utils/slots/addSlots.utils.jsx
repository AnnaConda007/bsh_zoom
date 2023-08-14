import { dateToNumber } from '../useTime.utils'
import { dataBaseUrl } from '../../contains'
import { crossingTimeMessage, sendErrorMessage } from '../../contains'

export const getTimeSlots = async (setErrorExsist, setErrorMessage) => {
  const response = await fetch(dataBaseUrl)
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
  }
  try {
    return (await response.json()) || []
  } catch (error) {
    console.error('Ошибка обработки или получения данных временных слотов', error)
    setErrorExsist(true)
    setErrorMessage(sendErrorMessage)
  }
}

export const getMatchingTimeSlots = async (timeSlots, timeStart, timeEnd) => {
  const start = dateToNumber(timeStart)
  const end = dateToNumber(timeEnd)
  const matchList = timeSlots.filter((time) => {
    return time >= start && time <= end
  })
  return matchList
}

export const generateTimeSlotsInRange = async (timeSlots, timeStart, timeEnd) => {
  const start = dateToNumber(timeStart)
  const end = dateToNumber(timeEnd)
  const minutDuration = (end - start) / 60
  const newSlots = Array.from({ length: minutDuration + 1 }, (_, i) => start + i * 60)
  return [...timeSlots, ...newSlots]
}

export const processAndPushTimeSlot = async ({ timeStart, timeEnd, setErrorExsist, setErrorMessage }) => {
  const timeSlots = await getTimeSlots(setErrorExsist, setErrorMessage)
  const matchList = await getMatchingTimeSlots(timeSlots, timeStart, timeEnd)
  if (matchList.length === 0) {
    const newSlotTime = await generateTimeSlotsInRange(timeSlots, timeStart, timeEnd)
    await pushTimeSlot(newSlotTime)
    return true
  } else {
    setErrorExsist(true)
    setErrorMessage(crossingTimeMessage)
  }
}

export const pushTimeSlot = async (data) => {
  try {
    const res = await fetch(dataBaseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res
  } catch (error) {
    console.error('Ошибка при отправке временных слотов', error)
    throw error
  }
}
