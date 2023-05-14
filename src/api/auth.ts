import axios from 'axios'

export const login = async (payload: { username: string; password: string }) =>
  axios.post('/auth/login', payload)

export const logout = async () => {}
export const getMe = async () => axios.get('/auth/me')

export const changePassword = async (payload: { password: string }) =>
  axios.patch('/auth/change-pass', payload)

const AuthServices = {
  login,
  logout,
  getMe,
  changePassword
}

export default AuthServices
