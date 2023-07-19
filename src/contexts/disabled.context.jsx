import { createContext, useState } from 'react'

export const DisabledContext = createContext({
  disabledDate: '',
  SetDisabledDate: () => {},
  errorExsist: '',
  SetErrorExsist: () => {},
  errorMessage: false,
  SetErrorMessage: () => {},
})

export const DisabledCProvider = ({ children }) => {
  const [disabledDate, SetDisabledDate] = useState('')
  const [errorExsist, SetErrorExsist] = useState(false)
  const [errorMessage, SetErrorMessage] = useState('')
  const value = {
    disabledDate,
    SetDisabledDate,
    errorExsist,
    SetErrorExsist,
    errorMessage,
    SetErrorMessage,
  }
  return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>
}
