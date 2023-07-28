import { useEffect, useState } from 'react'
import { getcurrentTime } from '../../utils/currentTime.utils'
import Calendar from '../../src/components/calendar/calendar.component'
const Home = () => {
  const autosaveTime = 604800000 //Неделя
  const authorizationTime = parseInt(localStorage.getItem('authorizationTime'))
  const [currentTime, setCurrentTime] = useState(null)
  useEffect(() => {
    const fetchCurrentTime = async () => {
      const time = await getcurrentTime()
      setCurrentTime(time)
    }
    fetchCurrentTime()
  }, [])
  useEffect(() => {
    const isExpired = authorizationTime + autosaveTime
    if (!authorizationTime || currentTime > isExpired) {
      window.location.href = 'http://localhost:5173/authorization'
    }
  }, [currentTime])

  return <Calendar />
}
export default Home
