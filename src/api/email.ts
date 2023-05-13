import axios from 'axios'

export const getListEmail = async () => axios.get(`/subscription`)
export const deleteListEmail = async (payload: number | string) =>
  axios.delete(`/subscription/${payload}`)
