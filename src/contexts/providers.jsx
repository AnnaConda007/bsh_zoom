import { DatesProvider } from './dates.context'
import { ErrorProvider } from './error.context'
import { TasksProvider } from './tasks.context'
export const Providers = ({ children }) => {
  return (
    <DatesProvider>
      <TasksProvider>
        <ErrorProvider>{children} </ErrorProvider>
      </TasksProvider>
    </DatesProvider>
  )
}
