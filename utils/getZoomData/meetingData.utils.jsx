import { updateAccesToken } from './tokens.utils'
import axios from 'axios'
import { formatedDateFromUTStoDMY } from '../formatting.utils'
import { calculatTimeEnd } from '../useTime.utils'
import { limitErrorMessage, serverErrorMessage, serverUrl } from '../../contains'

let hasRetried = false
setInterval(() => {
  hasRetried = true
}, 3540000) // 59 минут

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
    console.error('Ошибка при попытке получения ListMeeting', error)
    throw error
  }
}

export const getConferenceInfo = async (selectedDate, setErrorExsist, setErrorMessage) => {
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
    if (error.response && error.response.data.code === 124 && hasRetried === false) {
      hasRetried = true
      await updateAccesToken()
      return await getConferenceInfo(selectedDate)
    } else if (error.response && error.response.data.code === 429) {
      setErrorExsist(true)
      setErrorMessage(limitErrorMessage)
    } else {
      setErrorMessage(serverErrorMessage)
      setErrorExsist(true)
    }
    console.error('Ошибка при попытке получения getConferenceInfo')
    throw error
  }
}
