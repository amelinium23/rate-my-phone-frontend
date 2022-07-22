export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : 'https://rate-my-phone.herokuapp.com/'
