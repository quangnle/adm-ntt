import axios from 'axios'

const getAll = async (params?: {
  search?: string
  page?: number
  group?: string
  per_page?: number
  order_by?: 'priority' | 'id'
  order_type?: 'asc' | 'desc'
}) => {
  const { data } = await axios.get('/variables', { params })
  return data
}

const getById = async (params: number) => {
  const { data } = await axios.get(`/variables/${params}`)
  return data
}

export const create = async (payload: {
  id: number
  name: string
  value: string
  lang: string
  group: string
}) => axios.post('/variables', payload)

export const update = async ({
  id,
  ...payload
}: {
  id: number
  name: string
  value: string
  lang: string
  group: string
}) => axios.patch(`/variables/${id}`, payload)

export const deleteVariable = async (params: { ids: number[] }) =>
  axios.delete('/variables', { params })

const variableService = {
  getAll,
  getById,
  create,
  update,
  deleteVariable
}

export default variableService
