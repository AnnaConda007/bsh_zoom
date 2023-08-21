import { useContext, useEffect } from 'react'
import { vebSocketUrl } from '../../contains'
import { DatesContext } from '../contexts/dates.context'
const useWebSocket = () => {
  const { setUpDateTaggedDateNeed } = useContext(DatesContext)
  useEffect(() => {
    const wss = new WebSocket(vebSocketUrl)

    wss.onmessage = (message) => {
      setUpDateTaggedDateNeed(true)
    }
    wss.onerror = (error) => {
      console.error('Ошибка webSocket:', error)
    }
    return () => {
      wss.close()
    }
  }, [])
}

export default useWebSocket
