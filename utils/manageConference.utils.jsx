import { updateAccesToken } from './getZoomData.utils'
import { calculateDuration } from './calculat.utils'
import { limitErrorMessage, serverErrorMessage, serverUrl } from '../contains'
import axios from 'axios'

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
    await axios.get(`${serverUrl}/newConference`, {
      params: {
        conferenceTopic: JSON.stringify(topicValue),
        timeStart: timeStart,
        conferenceDuration: conferenceDuration,
        token: accessToken,
      },
    })
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      return await createMeet(conferenceTopic, timeStart, timeEnd)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true), setErrorMessage(limitErrorMessage)
    } else {
      console.error('Ошибка сервера при создании конференции:', error)
      setErrorExsist(true), setErrorMessage(serverErrorMessage)
    }
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
    } else if (error.respons && error.response.data.code === 429) {
      setErrorExsist(true), setErrorMessage(limitErrorMessage)
    } else {
      console.error('ошибка сервера при редактирвоании данных', error)
      setErrorExsist(true), setErrorMessage(serverErrorMessage)
    }
  }
}

export const deleteConference = async (conferenceId, setErrorExsist, setErrorMessage) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = conferenceId
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
    } else if (error.respons && error.response.data.code === 429) {
      setErrorExsist(true), setErrorMessage(limitErrorMessage)
    } else {
      console.error(' ошибка сервера при удалении данных', error)
      setErrorExsist(true)
      setErrorMessage(serverErrorMessage)
    }
  }
}
