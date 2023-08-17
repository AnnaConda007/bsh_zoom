import { useContext } from 'react'
import AddNewTask from '../addNewTask/addNewTask'
import AddedTasks from '../addedTasks/addedTasks'
import { ErrorContext } from '../../contexts/error.context'
import { DatesContext } from '../../contexts/dates.context'
import styles from './taskWrap.module.scss'
import { TasksContext } from '../../contexts/tasks.context'
import { useMeettingData } from '../../hooks/useMeettingData'
const TaskWrap = () => {
  const { activeDate } = useContext(DatesContext)
  const { disabledDate } = useContext(ErrorContext)
  const { tasksForActiveDate, setTasksForActiveDate } = useContext(TasksContext)
  useMeettingData()
  return (
    <>
      <div className={styles.planner}>
        <div className={`${styles.date} ${disabledDate ? styles.datedisabledDate : ''}`}>{activeDate}</div>
        <AddNewTask tasksForActiveDate={tasksForActiveDate} setTasksForActiveDate={setTasksForActiveDate} />
        <AddedTasks tasksForActiveDate={tasksForActiveDate} setTasksForActiveDate={setTasksForActiveDate} />
      </div>
    </>
  )
}

export default TaskWrap
