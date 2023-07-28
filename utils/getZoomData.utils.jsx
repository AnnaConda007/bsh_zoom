import axios from 'axios'
import {
  formatedDateFromUTStoDMY,
  formateTimeFromUTCtoHumanReadable,
} from './formatting.utils'
import { calculatTimeEnd } from './calculat.utils'
import { serverErrorMessage, serverUrl, zoomAutenficationErrorMassage } from '../contains'
export const getZoomTokens = async (redirect, setErrorExsist, setErrorMessage) => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')

    if (!localStorage.getItem('zoomRefreshToken')) {
      const response = await axios.get(`${serverUrl}/exchangeCode`, {
        params: {
          code: authorizationCode,
          redirecturl: redirect,
        },
      })
      localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
      localStorage.setItem('zoomAccesToken', response.data.access_token)
      return response.data
    }
  } catch (error) {
    console.error("'Ошибка при попытке получения токена", error)
    if (!localStorage.getItem('zoomRefreshToken')) {
      setErrorMessage(zoomAutenficationErrorMassage)
      setErrorExsist(true)
      setTimeout(() => {
        window.location.href = 'https://zoom.us/profile'
      }, 4000)
    } else {
      setErrorMessage(`${serverErrorMessage}`)
      setErrorExsist(true)
    }
  }
}

export const updateAccesToken = async () => {
  try {
    const refreshToken = localStorage.getItem('zoomRefreshToken')
    const response = await axios.post(`${serverUrl}/refreshToken`, {
      refreshToken: refreshToken,
    })
    localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
    localStorage.setItem('zoomAccesToken', response.data.access_token)
    return response.data
  } catch (error) {
    console.error('Ошибка при обновлении токена', error)
  }
}

export const getListMeeting = async () => {
  let accessToken = localStorage.getItem('zoomAccesToken')
  const response = await axios.get(`${serverUrl}/listMeetings`, {
    params: {
      accessToken: accessToken,
    },
  })
  return response.data
}

export const getTaggedDate = async (setErrorExsist, setErrorMessage) => {
  try {
    const taggedDateArr = []
    const conferenceData = await getListMeeting()
    const meetings = conferenceData.meetings
    meetings.forEach((miting) => {
      const startTime = miting.start_time
      const date = formatedDateFromUTStoDMY(startTime)
      if (!taggedDateArr.includes(date)) {
        taggedDateArr.push(date)
      }
    })
    return taggedDateArr
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      console.log('обновление токена')
      console.log(error.response.data.code)
      await updateAccesToken()
      return await getTaggedDate(setErrorExsist, setErrorMessage)
    } else {
      console.error('Ошибка при попытке получения ListMeeting', error)
      setErrorExsist(true)
      setErrorMessage(`${serverErrorMessage}`)
      throw error
    }
  }
}

export const getConferenceInfo = async (
  selectedDate,
  setErrorExsist,
  setErrorMessage
) => {
  try {
    const tasks = {}
    const conferenceData = await getListMeeting()
    const meetings = conferenceData.meetings
    meetings.forEach((meeting) => {
      const timeStart = meeting.start_time
      const duration = meeting.duration
      const date = formatedDateFromUTStoDMY(timeStart)
      let topicObject
      try {
        topicObject = JSON.parse(meeting.topic)
      } catch (error) {
        topicObject = { creator: 'не указан', value: meeting.topic }
      }
      const task = {
        creator: topicObject.creator,
        taskValue: topicObject.value,
        timeStart: formateTimeFromUTCtoHumanReadable(timeStart),
        timeEnd: calculatTimeEnd(timeStart, duration),
        meetingUrl: meeting.join_url,
        meetingId: meeting.id,
      }
      if (tasks[date]) {
        tasks[date].push(task)
      } else {
        tasks[date] = [task]
      }
    })
    const tasksForDay = tasks[selectedDate] || []
    return tasksForDay
  } catch (error) {
    if (error.response && error.response.data.code === 124) {
      console.log('обновление токена')
      console.error(error.response.data)
      await updateAccesToken(setErrorExsist, setErrorMessage)
      return await getConferenceInfo(selectedDate)
    } else {
      console.error(serverErrorMessage, error)
      setErrorExsist(true)
      setErrorMessage(`${serverErrorMessage}`)
      throw error
    }
  }
}
