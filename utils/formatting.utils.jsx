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
  let date = new Date(UTSTime) // используется для определения taggedDate
  let formattedDate =
    ('0' + date.getUTCDate()).slice(-2) +
    '-' +
    ('0' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    date.getUTCFullYear()
  return formattedDate // Dd-mm-year
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
