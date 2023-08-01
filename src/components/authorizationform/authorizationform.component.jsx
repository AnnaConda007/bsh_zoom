import './authorizationform.styles.scss'
import { Button, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { redirectHomeUrL } from '../../../contains'
import { getcurrentTime } from '../../../utils/useTime.utils'
function AuthorizationForm() {
  const [currentTime, setCurrentTime] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const time = await getcurrentTime()
      setCurrentTime(time)
    }
    fetchCurrentTime()
  }, [])

  const formValueDefault = {
    email: 'user@mail.ru', // Очистить
    password: '111111', // Очистить
  }
  const [formValue, setFormValue] = useState(formValueDefault)
  let { email, password } = formValue
  const changeInput = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  const sendAuthorizationData = async () => {
    try {
      const apiKey = import.meta.env.VITE_DB_API
      const authorizationUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      const response = await fetch(`${authorizationUrl}${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        setFormValue(formValueDefault)
        window.location.href = redirectHomeUrL
      } else {
        const data = await response.json()
        const errorMessage = data.error.message
        switch (errorMessage) {
          case 'INVALID_PASSWORD':
            setError('Неверный пароль')
            break
          case 'EMAIL_NOT_FOUND':
            setError('Неверный email')
            break
          default:
            console.error(error)
        }
      }
    } catch (error) {
      setError('Серверная ошибка')
      console.error(error)
    }
  }

  const hundleSubmitAuthorization = async (e) => {
    e.preventDefault()
    sendAuthorizationData(e)
    localStorage.setItem('authorizationTime', currentTime)
    localStorage.setItem('email', email)
  }

  return (
    <form className='formAuthorization' onSubmit={hundleSubmitAuthorization}>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          className='input-authorization'
          size='small'
          label='Email'
          onChange={changeInput}
          value={email}
          name='email'
          type='email'
          autoComplete='off'
          required
          sx={{ border: '1px solid' }}
        />
        <TextField
          className='input-authorization'
          variant='outlined'
          size='small'
          label='Пароль'
          onChange={changeInput}
          value={password}
          name='password'
          type='password'
          autoComplete='off'
          required
          sx={{ marginTop: '10px', border: '1px solid' }}
        />
      </FormControl>
      <p className='text-danger'>{error}</p>
      <Button variant='contained' type='submit' autoComplete='off' sx={{ width: '30%' }}>
        отправить
      </Button>
    </form>
  )
}

export default AuthorizationForm
