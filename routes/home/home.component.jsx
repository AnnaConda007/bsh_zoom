import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getcurrentTime } from '../../utils/useTime.utils'
import Calendar from '../../src/components/calendar/calendar.component'
import { ErrorContext } from '../../src/contexts/error.context'
import zoomAutenficationErrorMassage from '../../src/components/zoomAutenficationErrorMassage/zoomAutenficationErrorMassage.component'
import { autosaveTime, homeUrL } from '../../contains'
import { getZoomTokens } from '../../utils/getZoomData/tokens.utils'

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
      if (authorizationCode === null) {
        setErrorExsist(true)
        setErrorMessage(zoomAutenficationErrorMassage)
        setAutoHide(false)
        setErrorExsist(true)
      }
    }
    checkZoomAuthorization()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('zoomRefreshToken')) {
      const getTokens = async () => {
        await getZoomTokens(homeUrL)
      }
      getTokens()
    }
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
