import axios from 'axios'

const getAll = async (params?: {
  page?: number
  title?: string
  per_page?: number
  order_by?: 'priority' | 'id'
  order_type?: 'asc' | 'desc'
}) => {
  const { data } = await axios.get('/categories', { params })
  return data
}

export const create = async (payload: {
  title: string
  thumbnail: string
  description: string
  background: string
  link_url: string
  content: string
}) => axios.post('/categories', payload)

export const update = async ({
  id,
  ...payload
}: {
  id: number
  title: string
  thumbnail: string
  description: string
  background: string
  link_url: string
  content: string
}) => axios.patch(`/categories/${id}`, payload)

export const deleteMany = async (params: { ids: number[] }) =>
  axios.delete('/categories', { params })

const categoryService = {
  getAll,
  create,
  update,
  deleteMany
}

export default categoryService
