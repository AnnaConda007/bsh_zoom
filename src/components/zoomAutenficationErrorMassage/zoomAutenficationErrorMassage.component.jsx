const zoomAutenficationErrorMassage = () => {
  return (
    <>
      <p>
        Похоже, введены неверные данные аккаунта ZOOM или используется неправильный
        аккаунт. Пожалуйста, убедитесь, что вы вводите правильные данные и повторите
        попытку входа.
      </p>
      <a
        href='https://zoom.us/profile'
        target='_blank'
        rel='noreferrer'
        onClick={() => {
          localStorage.removeItem('authorizationTime')
          window.location.reload()
        }}
      >
        Перейти на страницу Zoom профиля
      </a>
    </>
  )
}

export default zoomAutenficationErrorMassage
