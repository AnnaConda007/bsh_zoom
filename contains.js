export const clientId = 'mkQg8GOmTSem7YxdUujxAA'
export const clientSecret = 'YQElNfVwH7Wo7zhvF0WV5HmIZw6jqDr0'
export const homeUrL = 'https://snazzy-muffin-3a5123.netlify.app/'
export const redirectHomeUrL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(homeUrL)}`
export const serverUrl = 'https://servzoom.onrender.com'
export const dataBaseUrl = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/timeArr.json'
export const autosaveTime = 604800000 // неделя
export const disabledMeeting = 'Редактирование чужих задач невозможно'
export const errorMessageForCompareErrorTime = 'Время начала конференции не может быть позже времени её окончания или совпадать с ней'
export const errorMessageForPastTimeError = 'Невозможно назначить встречу на прошедшее время'
export const limitErrorMessage = 'Вы достигли предельного количества запросов. Пожалуйста, попробуйте позже'
export const serverErrorMessage = 'Ошибка при запросе к сервреру'
export const crossingTimeMessage = 'Вы пытаетесь создать конференцию на время, которое уже занято или пересекается с другой встречей'
export const sendErrorMessage = 'Ошибка при отправке данных'
export const vebSocketUrl = 'wss://servzoom.onrender.com'
