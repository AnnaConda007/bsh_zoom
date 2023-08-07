import { useContext } from 'react'
import { vebSocketUrl } from '../contains'
import { DatesContext } from '../src/contexts/dates.context'

const useWebSocket = () => {
  const { setUpDateTaggedDateNeed } = useContext(DatesContext)

  const ws = new WebSocket(vebSocketUrl)
  ws.onmessage = (message) => {
    setUpDateTaggedDateNeed(true)
  }
  ws.onerror = (error) => {
    console.error(' ошибка webSocket :', error)
  }
}

export default useWebSocket
