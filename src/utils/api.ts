import axios from 'axios'
import moment from 'moment'
import {
  getLocalStore,
  LOCAL_STORE_KEY,
  removeLocalStore,
  setLocalStore
} from './localStore'

/**
 * axios config
 */
if (import.meta.env.MODE === 'development') {
  axios.defaults.baseURL = import.meta.env.VITE_APP_PROXY
}
if (import.meta.env.MODE === 'production') {
  axios.defaults.baseURL = import.meta.env.VITE_APP_PROXY
}
export const getToken = (): string | undefined => {
  try {
    const cache = getLocalStore(LOCAL_STORE_KEY.USER_INFO)

    if (
      cache &&
      typeof cache === 'object' &&
      typeof cache.expire === 'number' &&
      cache.expire >= Date.now()
    ) {
      return cache.access_token
    }
  } catch (error) {
    console.log(error)
  }

  return undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToken = (token: any): void => {
  return setLocalStore(LOCAL_STORE_KEY.USER_INFO, token as never)
}

export const clearSession = (): void => {
  return removeLocalStore(LOCAL_STORE_KEY.USER_INFO)
}

axios.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
    if (response.data.access_token) {
      setToken({
        access_token: response.data.access_token,
        expire: new Date(moment().add(7200, 'second').toISOString()).getTime()
      })
    }

    return response
  },
  async (error) => {
    const status = error.response ? error.response.status : null
    if (status === 401) {
      window.location.href = '/admin/login'
      removeLocalStore(LOCAL_STORE_KEY.USER_INFO)
    }
    return Promise.reject(error)
  }
)

export default {
  getToken,
  setToken,
  clearSession
}
