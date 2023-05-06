import configService from '@/api/config'
import { useEffect, useState } from 'react'

type ConfigType<T extends object> = {
  id: number
  key: string
  value: T
  meta_description: string
  meta_keywords: string
}

export default function useFetchConfig<T extends object>(
  key: string
): [ConfigType<T> | null, boolean, () => Promise<void>] {
  const [config, setConfig] = useState<ConfigType<T> | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const fetchConfig = async () => {
    try {
      setIsFetching(true)
      const { data } = await configService.getConfigWithKey(key)
      setConfig({
        ...data,
        value: JSON.parse(data?.value)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  return [config, isFetching, fetchConfig]
}
