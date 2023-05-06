import axios from 'axios'

export const login = async (payload: { username: string; password: string }) =>
  axios.post('/auth/login', payload)

export const logout = async () => {}
export const getMe = async () => axios.get('/auth/me')

const AuthServices = {
  login,
  logout,
  getMe
}

export default AuthServices
