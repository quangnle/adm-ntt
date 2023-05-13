import axios from 'axios'

export const getListEmail = async () => axios.get(`/subscription`)
