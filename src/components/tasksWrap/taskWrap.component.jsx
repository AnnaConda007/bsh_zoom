import { useEffect, useContext } from 'react'
import AddNewTask from '../addNewTask/addNewTask'
import AddedTasks from '../addedTasks/addedTasks'
import { getConferenceInfo } from '../../../utils/getZoomData.utils'
import { ErrorContext } from '../../contexts/error.context'
import { DatesContext } from '../../contexts/dates.context'
import styles from './taskWrap.module.scss'
import { TasksContext } from '../../contexts/tasks.context'
const TaskWrap = () => {
  const { activeDate } = useContext(DatesContext)
  const { disabledDate, setErrorExsist, setErrorMessage } = useContext(ErrorContext)
  const { tasksForActiveDate, setTasksForActiveDate } = useContext(TasksContext)
  useEffect(() => {
    const getTask = async () => {
      try {
        const task = await getConferenceInfo(activeDate, setErrorExsist, setErrorMessage)
        setTasksForActiveDate(task)
      } catch (error) {
        console.error(
          'Ошибка при попытке получения информации о конференциях на выбранную дату ',
          error
        )
      }
    }
    getTask()
  }, [activeDate])

  return (
    <>
      <div className={styles.planner}>
        <div className={`${styles.date} ${disabledDate ? styles.datedisabledDate : ''}`}>
          {activeDate}
        </div>
        <AddNewTask
          tasksForActiveDate={tasksForActiveDate}
          setTasksForActiveDate={setTasksForActiveDate}
        />
        <AddedTasks
          tasksForActiveDate={tasksForActiveDate}
          setTasksForActiveDate={setTasksForActiveDate}
        />
      </div>
    </>
  )
}

export default TaskWrap
