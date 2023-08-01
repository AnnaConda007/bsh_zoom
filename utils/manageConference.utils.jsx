import { updateAccesToken } from './getZoomData.utils'
import { calculateDuration } from './calculat.utils'
import { limitErrorMessage, serverUrl } from '../contains'
import axios from 'axios'
import { checkMatchMettingTimeArr, clearMettingTimeArr } from './useTime.utils'
import { crossingTimeMessage } from '../contains'
export const createMeet = async (
  setErrorExsist,
  setErrorMessage,
  conferenceTopic,
  timeStart,
  timeEnd
) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const userName = localStorage.getItem('email') || null
    const conferenceDuration = calculateDuration(timeStart, timeEnd)
    const topicValue = {
      creator: userName,
      value: conferenceTopic,
    }
    if (checkTime) {
      setErrorExsist(true), setErrorMessage(crossingTimeMessage)
      return
    } else {
      const response = await axios.get(`${serverUrl}/newConference`, {
        params: {
          conferenceTopic: JSON.stringify(topicValue),
          timeStart: timeStart,
          conferenceDuration: conferenceDuration,
          token: accessToken,
        },
      })

      return response
    }
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken(setErrorExsist, setErrorMessage)
      return await createMeet(conferenceTopic, timeStart, timeEnd)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    }
    console.error('Ошибка сервера при создании конференции:', error)
  }
}

export const updateConferenceInfo = async (
  idTopic,
  newData,
  setErrorExsist,
  setErrorMessage
) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = idTopic
    const data = newData
    const response = await axios.patch(`${serverUrl}/updateConferenceInfo`, {
      accessToken: accessToken,
      id: id,
      data: data,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      return await updateConferenceInfo(idTopic, newData)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    }
    console.error('ошибка сервера при редактирвоании данных', error)
  }
}

export const deleteConference = async (
  conferenceId,
  setErrorExsist,
  setErrorMessage,
  startTime,
  startEnd
) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = conferenceId
    const clearedMetting = await clearMettingTimeArr(startTime, startEnd)

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
      return await deleteConference(conferenceId)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    }
    console.error(' ошибка сервера при удалении данных ', error)
  }
}
