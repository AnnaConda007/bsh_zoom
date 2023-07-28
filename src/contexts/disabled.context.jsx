import { createContext, useState } from 'react'

export const DisabledContext = createContext({
  disabledDate: '',
  setDisabledDate: () => {},
  errorExsist: '',
  setErrorExsist: () => {},
  errorMessage: false,
  setErrorMessage: () => {},
})

export const DisabledCProvider = ({ children }) => {
  const [disabledDate, setDisabledDate] = useState('')
  const [errorExsist, setErrorExsist] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const value = {
    disabledDate,
    setDisabledDate,
    errorExsist,
    setErrorExsist,
    errorMessage,
    setErrorMessage,
  }
  return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>
}
