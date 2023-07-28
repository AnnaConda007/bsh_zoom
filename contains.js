export const clientId = "mkQg8GOmTSem7YxdUujxAA";
export const clientSecret = "YQElNfVwH7Wo7zhvF0WV5HmIZw6jqDr0";
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

export const zoomAutenficationErrorMassage =
  "Похоже, введены неверные данные аккаунта ZOOM или используется неправильный аккаунт. Пожалуйста, убедитесь, что вы вводите правильные данные и повторите попытку входа: Логин - annnaf@internet.ru, пароль An19628411, они так же указаны в сопроводителньом письме";
