import axios from 'axios'
import {
  formatedDateFromUTStoDMY,
  formateTimeFromUTCtoHumanReadable,
} from './formatting.utils'
import { calculatTimeEnd } from './calculat.utils'
import {
  limitErrorMessage,
  serverErrorMessage,
  serverUrl,
  clientId,
  clientSecret,
} from '../contains'
let hasRetried = false
setInterval(() => {
  hasRetried = true
}, 3540000) // 59 минут

export const getZoomTokens = async (redirect) => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')
    const response = await axios.get(`${serverUrl}/exchangeCode`, {
      params: {
        code: authorizationCode,
        redirecturl: redirect,
        clientId: clientId,
        clientSecret: clientSecret,
      },
    })
    localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
    localStorage.setItem('zoomAccesToken', response.data.access_token)
    return response.data
  } catch (error) {
    console.error('Ошибка при попытке получения токена', error)
    if (error.code === 'ERR_NETWORK') {
      return false
    }
  }
}

export const updateAccesToken = async (setErrorExsist, setErrorMessage) => {
  try {
    const refreshToken = localStorage.getItem('zoomRefreshToken')
    const response = await axios.post(`${serverUrl}/refreshToken`, {
      refreshToken: refreshToken,
      clientId: clientId,
      clientSecret: clientSecret,
    })
    localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
    localStorage.setItem('zoomAccesToken', response.data.access_token)
    return response.data
  } catch (error) {
    console.error('Ошибка при обновлении токена', error)
  }
}

export const getListMeeting = async () => {
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const response = await axios.get(`${serverUrl}/listMeetings`, {
      params: {
        accessToken: accessToken,
      },
    })
    return response.data
  } catch (error) {
    console.error('Ошибка при попытке получения ListMeeting', error)
    throw error
  }
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
    console.error('Ошибка при попытке получения ListMeeting', error)
    if (error.response && error.response.data.code === 124 && hasRetried === false) {
      hasRetried = true
      await updateAccesToken()
      return await getTaggedDate(setErrorExsist, setErrorMessage)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else {
      setErrorMessage(serverErrorMessage)
      setErrorExsist(true)
    }
    throw error
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
        timeStart: timeStart.replace('Z', ''),
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
    console.error('Ошибка при попытке получения getConferenceInfo')
    if (error.response && error.response.data.code === 124 && hasRetried === false) {
      hasRetried = true
      await updateAccesToken(setErrorExsist, setErrorMessage)
      return await getConferenceInfo(selectedDate)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else if (error.code === 'ERR_NETWORK') {
      setErrorMessage(serverErrorMessage)
      setErrorExsist(true)
    }
    throw error
  }
}

export const getDates = async (setTaggedDates, setErrorExsist, setErrorMessage) => {
  try {
    setTaggedDates(await getTaggedDate(setErrorExsist, setErrorMessage))
  } catch (error) {
    console.error('Ошибка при попытке получения TaggedDates ', error)
  }
}

export const getTask = async (
  activeDate,
  setErrorExsist,
  setErrorMessage,
  setTasksForActiveDate
) => {
  if (!activeDate) return
  try {
    const task = await getConferenceInfo(activeDate, setErrorExsist, setErrorMessage)
    setTasksForActiveDate(task)
  } catch (error) {
    console.error(
      'Ошибка при попытке получения информации о конференциях на выбранную дату ',
      error
    )
  }
}
