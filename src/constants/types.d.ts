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

export type ICategory = {
  id: number
  link_url: string
  title: string
  alias: string
  thumbnail: string | null
  background: string | null
  description: string | null
  content: string | null
  meta_description: string | null
  meta_keywords: string | null
  is_active: number
  priority: number
  created_at: string
  updated_at: string
}

export type IGroup = {
  id: number
  label: string
  label_html: string
  title: string
  description: string | null
  image: string | null
  meta_description: string | null
  meta_keywords: string | null
  category_id: number
  is_active: number
  priority: number
  created_at: string
  updated_at: string
}

export type IProduct = {
  id: number
  title: string
  alias: string
  link: string | null
  image: string | null
  description: string | null
  content: string | null
  meta_description: string | null
  meta_keywords: string | null
  group_id: number
  is_active: number
  priority: number
  created_at: string
  updated_at: string
}

export type ICategory = {
  id: number
  link_url: string
  title: string
  alias: string
  thumbnail: string
  background: hstring
  description: string
  content: string
  meta_description: string
  meta_keywords: string
  is_active: number
  priority: number
  created_at: string
  updated_at: string
}
