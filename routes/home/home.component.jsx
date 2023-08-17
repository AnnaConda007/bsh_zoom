import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getcurrentTime } from '../../src/utils/time.utils'
import Calendar from '../../src/components/calendar/calendar.component'
import { ErrorContext } from '../../src/contexts/error.context'
import zoomAutenficationErrorMassage from '../../src/components/zoomAutenficationErrorMassage/zoomAutenficationErrorMassage.component'
import { autosaveTime } from '../../contains'

const Home = () => {
  const navigate = useNavigate()
  const timeToAutosave = autosaveTime
  const authorizationTime = parseInt(localStorage.getItem('authorizationTime'))
  const [currentTime, setCurrentTime] = useState(null)
  const { setErrorMessage, setErrorExsist, setAutoHide } = useContext(ErrorContext)

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const time = await getcurrentTime()
      setCurrentTime(time)
    }
    fetchCurrentTime()
  }, [])

  useEffect(() => {
    const checkZoomAuthorization = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const authorizationCode = urlParams.get('code')
      if (authorizationCode === null && !localStorage.getItem('zoomAccesToken') ) {
        setErrorExsist(true)
        setErrorMessage(zoomAutenficationErrorMassage)
        setAutoHide(false)
        setErrorExsist(true)
      }
    }
    checkZoomAuthorization()
  }, [])

  useEffect(() => {
    const isExpired = authorizationTime + timeToAutosave
    if (!authorizationTime || currentTime > isExpired) {
      navigate('authorization')
    }
  }, [currentTime])

  return <Calendar />
}
export default Home
