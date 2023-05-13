import axios from 'axios'

export const getListForm = async () => axios.get(`/form`)
export const deleteListForm = async (payload: number | string) =>
  axios.delete(`/form/${payload}`)
