import axios from 'axios'

const getAll = async (params?: {
  page?: number
  per_page?: number
  order_by?: 'priority' | 'id'
  order_type?: 'asc' | 'desc'
}) => {
  const { data } = await axios.get('/categories', { params })
  return data
}

const categoryService = {
  getAll
}

export default categoryService
