import axios from 'axios'

export const getAll = async (params?: {
  category_id?: number
  page?: number
  per_page?: number
  order_by?: 'priority' | ''
  order_type?: 'asc' | 'desc'
}) => {
  const { data } = await axios.get('/groups', { params })
  return data
}

const groupService = {
  getAll
}

export default groupService
