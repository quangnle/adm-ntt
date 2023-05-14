import axios from 'axios'

export type TKeyConfig =
  | 'footer'
  | 'layout'
  | 'contact'
  | 'homepage'
  | 'about-us'
  | 'logo'
  | 'footer_menus'
  | 'navbar_menus'
  | 'about-us-detail'
  | 'value-to-customer'
  | 'products'
  | 'about-us-values-customer'
  | 'contact-detail'
  | 'debug'
  | 'maintenance'

export const getConfigWithKey = async (key: TKeyConfig) =>
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
