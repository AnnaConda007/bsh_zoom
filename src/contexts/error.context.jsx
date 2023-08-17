import { createContext, useState } from 'react'

export const ErrorContext = createContext({
  disabledDate: '',
  setDisabledDate: () => {},
  errorExsist: false,
  setErrorExsist: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  autoHide: true,
  setAutoHide: () => {},
})

export const ErrorProvider = ({ children }) => {
  const [disabledDate, setDisabledDate] = useState('')
  const [errorExsist, setErrorExsist] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [autoHide, setAutoHide] = useState(true)
  const value = {
    disabledDate,
    setDisabledDate,
    errorExsist,
    setErrorExsist,
    errorMessage,
    setErrorMessage,
    autoHide,
    setAutoHide,
  }
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
