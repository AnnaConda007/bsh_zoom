import { updateAccesToken } from './getZoomData.utils'
import { calculateDuration } from './calculat.utils'
import { limitErrorMessage, serverErrorMessage } from '../contains'
import axios from 'axios'

export const createMeet = async (
  SetErrorExsist,
  SetErrorMessage,
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
    await axios.get('https://serverzoom.onrender.com', {
      params: {
        conferenceTopic: JSON.stringify(topicValue),
        timeStart: timeStart,
        conferenceDuration: conferenceDuration,
        token: accessToken,
      },
    })
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      console.log('Обновление токена')
      console.error(error.response.data)

      await updateAccesToken()
      return await createMeet(conferenceTopic, timeStart, timeEnd)
    } else if (error.response && error.response.data.code === 429) {
      SetErrorExsist(true), SetErrorMessage(limitErrorMessage)
    } else {
      console.error('Ошибка сервера при создании конференции:', error)
      SetErrorExsist(true), SetErrorMessage(`${serverErrorMessage}:createMeet`)
    }
  }
}

export const updateConferenceInfo = async (
  idTopic,
  newData,
  SetErrorExsist,
  SetErrorMessage
) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = idTopic
    const data = newData
    const response = await axios.patch('https://serverzoom.onrender.com', {
      accessToken: accessToken,
      id: id,
      data: data,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      await updateAccesToken()
      console.log('обновлние токена')
      console.error(error.response.data)

      return await updateConferenceInfo(idTopic, newData)
    } else if (error.respons && error.response.data.code === 429) {
      SetErrorExsist(true), SetErrorMessage(limitErrorMessage)
    } else {
      console.error(' ошибка сервера при редактирвоании данных', error)
      SetErrorExsist(true), SetErrorMessage(`${serverErrorMessage}:updateConferenceInfo`)
    }
  }
}

export const deleteConference = async (conferenceId, SetErrorExsist, SetErrorMessage) => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const id = conferenceId
    const response = await axios.delete('https://serverzoom.onrender.com', {
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
      console.log('обновлние токена')
      console.error(error.response.data)

      return await deleteConference(conferenceId)
    } else if (error.respons && error.response.data.code === 429) {
      SetErrorExsist(true), SetErrorMessage(limitErrorMessage)
    } else {
      console.error(' ошибка сервера при удалении данных', error)
      SetErrorExsist(true)
      SetErrorMessage(`${serverErrorMessage}:deleteConference`)
    }
  }
}
