import { useContext, useEffect } from 'react'
import { ErrorContext } from '../contexts/error.context'
import { getListMeeting } from '../utils/apiZoom'
import { formatedDateFromUTStoDMY } from '../utils/formatting.utils'
import { updateAccesToken } from '../utils/apiZoom'
import { limitErrorMessage, serverErrorMessage } from '../../contains'
import { DatesContext } from '../contexts/dates.context'
import { homeUrL } from '../../contains'

let hasRetried = false
setInterval(() => {
  hasRetried = true
}, 3540000) // 59 минут

export const markMettingDates = () => {
  const { setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { setTaggedDates, upDateTaggedDateNeed, setUpDateTaggedDateNeed } = useContext(DatesContext)
  const getDates = async () => {
    try {
      const taggedDateArr = []
      const conferenceData = await getListMeeting(homeUrL)
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
        await updateAccesToken()
        return await getDates(setErrorExsist, setErrorMessage)
      } else if (error.response && error.response.data.code === 429) {
        setErrorExsist(true)
        setErrorMessage(limitErrorMessage)
      } else if (error.code === 'ERR_NETWORK') {
        setErrorMessage(serverErrorMessage)
        setErrorExsist(true)
      }
      console.error('Ошибка при попытке получения ListMeeting', error)
    }
  }
  useEffect(() => {
    getDates()
  }, [upDateTaggedDateNeed])
}
