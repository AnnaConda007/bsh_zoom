import { useContext, useEffect } from 'react'
import { vebSocketUrl } from '../contains'
import { DatesContext } from '../src/contexts/dates.context'
const useWebSocket = () => {
  const { setUpDateTaggedDateNeed } = useContext(DatesContext)
  useEffect(() => {
    const ws = new WebSocket(vebSocketUrl)
    ws.onmessage = (message) => {
      setUpDateTaggedDateNeed(true)
    }
    ws.onerror = (error) => {
      console.error('Ошибка webSocket:', error)
    }
    return () => {
      ws.close()
    }
  }, [])
}

export default useWebSocket
