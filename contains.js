export const clientId = "wYILEd3tQnCCk4CE6Jihxg";
export const clientSecret = "nRPLBGGecg3O2VaUre8c6C7xPvJTboaZ";
export const homeUrL = "http://localhost:5173/";
export const redirectHomeUrL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  homeUrL
)}`;

export const errorMessageForCompareErrorTime =
  "Время начала конференции не может быть позже времени её окончания";
export const errorMessageForPastTimeError =
  "Невозможно назначить встречу на прошедшее время";
export const limitErrorMessage =
  "Вы достигли предельного количества запросов. Пожалуйста, попробуйте снова после 03:00 по времени Москве.";
export const serverErrorMessage = "Ошибка при запросе к сервреру";
