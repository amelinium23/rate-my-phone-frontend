export const validateLogin = (login: string) =>
  /[^\s@]+@[^\s@]+.[^\s@]/.test(login)

export const validatePassword = (password: string) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
