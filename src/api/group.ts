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

export const create = async (payload: {
  title: string
  image: string
  label: string
  label_html: string
  description: string
  category_id: number
}) => axios.post('/groups', payload)

export const update = async ({
  id,
  ...payload
}: {
  id: number
  title: string
  image: string
  label: string
  label_html: string
  description: string
  category_id: number
}) => axios.patch(`/groups/${id}`, payload)

export const deleteMany = async (params: { ids: number[] }) =>
  axios.delete('/groups', { params })

const groupService = {
  getAll,
  create,
  update
}

export default groupService
