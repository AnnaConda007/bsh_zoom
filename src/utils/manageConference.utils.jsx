import { updateAccesToken } from './zoomApi'
import { calculateDuration } from './time.utils'
import { limitErrorMessage, serverUrl, serverErrorMessage } from '../../contains'
import axios from 'axios'
import { clearMettingTimeArr } from './slots/upDateSlots.utils'

export const createMeet = async ({ conferenceTopic, timeStart, timeEnd, setErrorExsist, setErrorMessage }) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const userName = localStorage.getItem('email') || null
    const conferenceDuration = calculateDuration({ timeStart, timeEnd })
    const topicValue = {
      creator: userName,
      value: conferenceTopic,
    }
    await axios.get(`${serverUrl}/newConference`, {
      params: {
        conferenceTopic: JSON.stringify(topicValue),
        timeStart: timeStart,
        conferenceDuration: conferenceDuration,
        token: accessToken,
      },
    })
    return true
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      return await createMeet({ conferenceTopic, timeStart, timeEnd, setErrorExsist, setErrorMessage })
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else if (error.code === 'ERR_NETWORK') {
      setErrorExsist(true)
      setErrorMessage(serverErrorMessage)
    }
    console.error('Ошибка сервера при создании конференции:', error)
  }
}

export const updateConferenceInfo = async ({ meetingId, newMeetingData, setErrorExsist, setErrorMessage }) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = meetingId
    const data = newMeetingData
    const response = await axios.patch(`${serverUrl}/updateConferenceInfo`, {
      accessToken: accessToken,
      id: id,
      data: data,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      return await updateConferenceInfo({ meetingId, newMeetingData, setErrorExsist, setErrorMessage })
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else if (error.code === 'ERR_NETWORK') {
      setErrorExsist(true)
      setErrorMessage(serverErrorMessage)
    }
    console.error('ошибка сервера при редактирвоании данных', error)
  }
}

export const deleteConference = async ({ meetingId, setErrorExsist, setErrorMessage, startTime, startEnd }) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = meetingId
    const clearedMetting = await clearMettingTimeArr({ start: `${startTime}Z`, end: `${startEnd}Z` })

    if (!clearedMetting) return
    const response = await axios.delete(`${serverUrl}/deleteConference`, {
      data: {
        accessToken: accessToken,
        id: id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      return await deleteConference({ meetingId, setErrorExsist, setErrorMessage, startTime, startEnd })
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else if (error.code === 'ERR_NETWORK') {
      setErrorExsist(true)
      setErrorMessage(serverErrorMessage)
    }
    console.error(' ошибка сервера при удалении данных ', error)
  }
}
