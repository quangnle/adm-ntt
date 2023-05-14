import axios from 'axios'

export const getAll = async (params?: {
  group_id?: number
  title?: string
  page?: number
  per_page?: number
  order_by?: 'priority' | ''
  order_type?: 'asc' | 'desc'
}) => {
  const { data } = await axios.get('/products', { params })
  return data
}

export const create = async (payload: {
  title: string
  image: string
  link: string
  description: string
  group_id: number
}) => axios.post('/products', payload)

export const update = async ({
  id,
  ...payload
}: {
  id: number
  title: string
  image: string
  link: string
  description: string
  group_id: number
  priority: number
}) => axios.patch(`/products/${id}`, payload)

export const deleteMany = async (params: { ids: number[] }) =>
  axios.delete('/products', { params })

const productService = {
  getAll,
  create,
  update,
  deleteMany
}

export default productService
