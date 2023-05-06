import axios from 'axios'

export const getConfigWithKey = async (key: string) =>
  axios.get(`/config/key/${key}`)

const configService = {
  getConfigWithKey
}
export default configService
