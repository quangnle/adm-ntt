import axios from 'axios'

export const getConfigWithKey = async (key: string) =>
  axios.get(`/config/key/${key}`)

export const createConfig = async <T extends object>(payload: {
  key: string
  value: T
  meta_description: string
  meta_keywords: string
}) => axios.post('/config', payload)

export const updateConfigWithKey = async <T extends object>(
  id: number,
  payload: {
    key?: string
    value?: T
    meta_description?: string
    meta_keywords?: string
  }
) => axios.patch(`/config/${id}`, payload)

const configService = {
  getConfigWithKey,
  createConfig,
  updateConfigWithKey
}
export default configService
