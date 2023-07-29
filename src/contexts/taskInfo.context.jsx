import { createContext, useState } from 'react'

export const TaskInfoContext = createContext({
  conferenceTopic: '',
  setConferenceTopic: () => {},
  timeStart: '',
  setTimeStart: () => {},
  timeEnd: '',
  setTimeEnd: () => {},
  tasksForActiveDate: [],
  setTasksForActiveDate: () => {},
})

export const TaskInfoProvider = ({ children }) => {
  const [conferenceTopic, setConferenceTopic] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [tasksForActiveDate, setTasksForActiveDate] = useState([])

  const value = {
    conferenceTopic,
    setConferenceTopic,
    timeStart,
    setTimeStart,
    timeEnd,
    setTimeEnd,
    tasksForActiveDate,
    setTasksForActiveDate,
  }
  return <TaskInfoContext.Provider value={value}> {children} </TaskInfoContext.Provider>
}
