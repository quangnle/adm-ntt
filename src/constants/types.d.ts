export type accountType = {
  email: string
  name: string
  role: 'user' | 'admin'
}

export type TDataType = 'string' | 'image' | 'video'

export type ConfigType = {
  id: number
  value: never
}
