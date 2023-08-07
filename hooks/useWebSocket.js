import { useContext } from 'react'
import { vebSocketUrl } from '../contains'
import { DatesContext } from '../src/contexts/dates.context'

const useWebSocket = () => {
  const { setUpDateTaggedDateNeed } = useContext(DatesContext)

  const wss = new WebSocket(vebSocketUrl)
  wss.onmessage = (message) => {
    setUpDateTaggedDateNeed(true)
  }
  wss.onerror = (error) => {
    console.error(' ошибка webSocket :', error)
  }
}

export default useWebSocket
