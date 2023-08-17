import { useContext, useEffect } from 'react'
import { ErrorContext } from '../contexts/error.context'
import { getListMeeting } from '../utils/apiZoom'
import { formatedDateFromUTStoDMY } from '../utils/formatting.utils'
import { updateAccesToken } from '../utils/apiZoom'
import { limitErrorMessage, serverErrorMessage } from '../../contains'
import { DatesContext } from '../contexts/dates.context'
import { calculatTimeEnd } from '../utils/time.utils'
import { TasksContext } from '../contexts/tasks.context'

let hasRetried = false
setInterval(() => {
  hasRetried = true
}, 3540000) // 59 минут

export const useMeettingData = () => {
  const { setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { setTasksForActiveDate } = useContext(TasksContext)
  const { activeDate, upDateTaggedDateNeed, setUpDateTaggedDateNeed } = useContext(DatesContext)
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
        await updateAccesToken()
        return await getInfo()
      } else if (error.response && error.response.data.code === 429) {
        setErrorExsist(true)
        setErrorMessage(limitErrorMessage)
      } else if (error.code === 'ERR_NETWORK') {
        setErrorMessage(serverErrorMessage)
        setErrorExsist(true)
      }
      console.error('Ошибка при попытке получения ListMeeting', error.code)
    }
  }
  useEffect(() => {
    getInfo()
  }, [upDateTaggedDateNeed])
}
