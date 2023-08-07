import { createContext, useState } from 'react'

export const DatesContext = createContext({
  activeDate: '',
  setActiveDate: () => {},
  taggedDates: [],
  setTaggedDates: () => {},
  upDateTaggedDateNeed: false,
  setUpDateTaggedDateNeed: () => {},
})

export const DatesProvider = ({ children }) => {
  const [activeDate, setActiveDate] = useState('')
  const [taggedDates, setTaggedDates] = useState([])
  const [upDateTaggedDateNeed, setUpDateTaggedDateNeed] = useState(false)

  const value = {
    activeDate,
    setActiveDate,
    taggedDates,
    setTaggedDates,
    upDateTaggedDateNeed,
    setUpDateTaggedDateNeed,
  }
  return <DatesContext.Provider value={value}>{children}</DatesContext.Provider>
}
