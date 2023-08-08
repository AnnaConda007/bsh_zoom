import { useContext, useEffect } from 'react'
import { ErrorContext } from '../src/contexts/error.context'
import { getListMeeting } from '../utils/getZoomData'
import { formatedDateFromUTStoDMY } from '../utils/formatting.utils'
import { updateAccesToken } from '../utils/getZoomData'
import { limitErrorMessage, serverErrorMessage } from '../contains'
import { DatesContext } from '../src/contexts/dates.context'
import { calculatTimeEnd } from '../utils/useTime.utils'
import { TasksContext } from '../src/contexts/tasks.context'
let hasRetried = false
setInterval(() => {
  hasRetried = true
}, 3540000) // 59 минут
const urlParams = new URLSearchParams(window.location.search)
const authorizationCode = urlParams.get('code')

export const useTaggedDates = () => {
  const { setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { setTaggedDates, upDateTaggedDateNeed, setUpDateTaggedDateNeed } = useContext(DatesContext)
  const getDates = async () => {
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
      setTaggedDates(taggedDateArr)
      setUpDateTaggedDateNeed(false)
    } catch (error) {
      if (error.response && error.response.data.code === 124 && hasRetried === false) {
        hasRetried = true
        await updateAccesToken()
        return await getDates(setErrorExsist, setErrorMessage)
      } else if (error.response && error.response.data.code === 429) {
        setErrorExsist(true)
        setErrorMessage(limitErrorMessage)
      }
      console.error('Ошибка при попытке получения ListMeeting', error)
    }
  }
  useEffect(() => {
    getDates()
  }, [upDateTaggedDateNeed])
}

export const useConferenceInfo = () => {
  const { setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { activeDate } = useContext(DatesContext)
  const { setTasksForActiveDate } = useContext(TasksContext)
  const { upDateTaggedDateNeed, setUpDateTaggedDateNeed } = useContext(DatesContext)
  const getInfo = async () => {
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
      const tasksForDay = tasks[activeDate] || []
      setTasksForActiveDate(tasksForDay)
      setUpDateTaggedDateNeed(false)
    } catch (error) {
      if (error.response && error.response.data.code === 124 && hasRetried === false) {
        hasRetried = true
        await updateAccesToken()
        return await getInfo()
      } else if (error.response && error.response.data.code === 429) {
        setErrorExsist(true)
        setErrorMessage(limitErrorMessage)
      }
      console.error('Ошибка при попытке получения ListMeeting')
    }
  }
  useEffect(() => {
    getInfo()
  }, [upDateTaggedDateNeed])
}
