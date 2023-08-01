import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getcurrentTime } from '../../utils/useTime.utils'
import Calendar from '../../src/components/calendar/calendar.component'
import { ErrorContext } from '../../src/contexts/error.context'
import zoomAutenficationErrorMassage from '../../src/components/zoomAutenficationErrorMassage/zoomAutenficationErrorMassage.component'
const Home = () => {
  const navigate = useNavigate()
  const autosaveTime = 604800000 //Неделя
  const authorizationTime = parseInt(localStorage.getItem('authorizationTime'))
  const [currentTime, setCurrentTime] = useState(null)
  const { setErrorMessage, setErrorExsist, setAutoHide } = useContext(ErrorContext)
  useEffect(() => {
    const fetchCurrentTime = async () => {
      const time = await getcurrentTime()
      setCurrentTime(time)
    }
    fetchCurrentTime()

    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')
    if (authorizationCode === null) {
      setErrorMessage(zoomAutenficationErrorMassage)
      setAutoHide(false)
      setErrorExsist(true)
    }
  }, [])

  useEffect(() => {
    const isExpired = authorizationTime + autosaveTime
    if (!authorizationTime || currentTime > isExpired) {
      navigate('authorization')
    }
  }, [currentTime])

  return <Calendar />
}
export default Home
