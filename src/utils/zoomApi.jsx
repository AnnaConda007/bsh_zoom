import axios from 'axios'
import { serverUrl, clientId, clientSecret } from '../../contains'

export const getZoomTokens = async (redirect) => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')
    const response = await axios.get(`${serverUrl}/exchangeCode`, {
      params: {
        code: authorizationCode,
        redirecturl: redirect,
        clientId: clientId,
        clientSecret: clientSecret,
      },
    })
    localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
    localStorage.setItem('zoomAccesToken', response.data.access_token)
    return response.data
  } catch (error) {
    console.error('Ошибка при попытке получения токена', error)
  }
}

export const updateAccesToken = async () => {
  try {
    const refreshToken = localStorage.getItem('zoomRefreshToken')
    const response = await axios.post(`${serverUrl}/refreshToken`, {
      refreshToken: refreshToken,
      clientId: clientId,
      clientSecret: clientSecret,
    })
    localStorage.setItem('zoomRefreshToken', response.data.refresh_token)
    localStorage.setItem('zoomAccesToken', response.data.access_token)
    return response.data
  } catch (error) {
    console.error('Ошибка при обновлении токена', error)
  }
}

export const getListMeeting = async (redirect) => {
  if (!localStorage.getItem('zoomRefreshToken')) {
    await getZoomTokens(redirect)
  }
  try {
    let accessToken = localStorage.getItem('zoomAccesToken')
    const response = await axios.get(`${serverUrl}/listMeetings`, {
      params: {
        accessToken: accessToken,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
