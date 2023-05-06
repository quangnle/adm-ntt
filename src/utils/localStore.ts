export const LOCAL_STORE_KEY = {
  USER_INFO: 'userInfo'
}

export const getLocalStore = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export const setLocalStore = (key: string, value: never) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStore = (key: string) => {
  localStorage.removeItem(key)
}
