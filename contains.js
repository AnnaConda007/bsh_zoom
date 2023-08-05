export const clientId = "wYILEd3tQnCCk4CE6Jihxg";
export const clientSecret = "nRPLBGGecg3O2VaUre8c6C7xPvJTboaZ";
export const zoomVebHookSecretToken = "cLdi2VzFS3GIyTD5qYR3hQ";
export const homeUrL = "http://localhost:5173";
export const redirectHomeUrL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  homeUrL
)}`;
export const serverUrl = "https://localhost:3000";
export const dataBaseUrl =
  "https://test-f176b-default-rtdb.firebaseio.com/timeArr.json";
export const autosaveTime = 604800000; // неделя
export const disabledMeeting = "чужая задача";
export const errorMessageForCompareErrorTime =
  "Время начала конференции не может быть позже времени её окончания или совпадать с ней";
export const errorMessageForPastTimeError =
  "Невозможно назначить встречу на прошедшее время";
export const limitErrorMessage =
  "Вы достигли предельного количества запросов. Пожалуйста, попробуйте снова после 03:00 по времени Москве.";
export const serverErrorMessage = "Ошибка при запросе к сервреру";
export const crossingTimeMessage =
  "Вы пытаетесь создать конференцию на время, которое уже занято или пересекается с другой встречей";
export const sendErrorMessage = "Ошибка при отправке данных";
export const vebSocketUrl = "ws://localhost:3001";
