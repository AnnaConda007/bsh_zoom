import { createContext, useState } from 'react'

export const TasksContext = createContext({
  conferenceTopic: '',
  setConferenceTopic: () => {},
  timeStart: '',
  setTimeStart: () => {},
  timeEnd: '',
  setTimeEnd: () => {},
  tasksForActiveDate: [],
  setTasksForActiveDate: () => {},
})

export const TasksProvider = ({ children }) => {
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
  return <TasksContext.Provider value={value}> {children} </TasksContext.Provider>
}
