export const formatedDateToUTS = (selectedTime, activeDate) => {
  const timeObj = new Date(selectedTime)
  const dateSegments = activeDate.split('-').reverse()
  const dateObj = new Date(dateSegments.join('-'))
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  const hours = timeObj.getHours().toString().padStart(2, '0')
  const minutes = timeObj.getMinutes().toString().padStart(2, '0')
  const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}:00Z`
  return iso8601Date // 2023-07-14T02:00:00Z
}

export const formatedDateFromUTStoDMY = (UTSTime) => {
  let date = new Date(UTSTime)
  let formattedDate =
    ('0' + date.getUTCDate()).slice(-2) +
    '-' +
    ('0' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    date.getUTCFullYear()
  return formattedDate // Dd-mm-year
}

export const formateTimeFromUTCtoHumanReadable = (time) => {
  const inputDate = time
  const date = new Date(inputDate)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const dayOfWeek = daysOfWeek[date.getUTCDay()]
  const month = months[date.getUTCMonth()]
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')} `
  return formattedDate // Sat Jul 15 2023 09:00:00
}

export const formatTimeFromUTSToUnix = (utsTime) => {
  let dateStr = utsTime
  let date = new Date(dateStr)
  const timeStart = Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ) / 1000
  )
  return timeStart //5445495498489
}
