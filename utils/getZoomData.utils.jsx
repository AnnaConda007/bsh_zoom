import axios from 'axios'
import {
  formatedDateFromUTStoDMY,
  formateTimeFromUTCtoHumanReadable,
} from './formatting.utils'
import { calculatTimeEnd } from './calculat.utils'
import { serverErrorMessage, zoomAutenficationErrorMassage } from '../contains'
export const getZoomTokens = async (redirect, SetErrorExsist, SetErrorMessage) => {
  const urlParams = new URLSearchParams(window.location.search)
  const authorizationCode = urlParams.get('code')
  try {
    if (!localStorage.getItem('zoomRefreshToken')) {
      const response = await axios.get('https://servzoom.onrender.com/exchangeCode', {
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
    console.error('Ошибка при попытке получения токена', error)
    if (authorizationCode === null) {
      SetErrorMessage(zoomAutenficationErrorMassage)
      SetErrorExsist(true)
      setTimeout(() => {
        localStorage.removeItem('authorizationTime')
        window.location.href = 'https://zoom.us/profile'
      }, 4000)
    } else {
      SetErrorMessage(serverErrorMessage)
      SetErrorExsist(true)
    }
  }
}

export const updateAccesToken = async () => {
  try {
    const refreshToken = localStorage.getItem('zoomRefreshToken')
    const response = await axios.post('https://servzoom.onrender.com/refreshToken', {
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
  const response = await axios.get('https://servzoom.onrender.com/listMeetings', {
    params: {
      accessToken: accessToken,
    },
  })
  return response.data
}

export const getTaggedDate = async (SetErrorExsist, SetErrorMessage) => {
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
      await updateAccesToken()
      return await getTaggedDate(SetErrorExsist, SetErrorMessage)
    } else {
      console.error('Ошибка при попытке получения ListMeeting:', error)

      throw error
    }
  }
}

export const getConferenceInfo = async (
  selectedDate,
  SetErrorExsist,
  SetErrorMessage
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
      await updateAccesToken(SetErrorExsist, SetErrorMessage)
      return await getConferenceInfo(selectedDate)
    } else {
      console.error('Ошибка при попытке получения ListMeeting:', error)

      throw error
    }
  }
}
