import configService from '@/api/config'
import { useEffect, useState } from 'react'

export default function useFetchConfig(key: string) {
  const [config, setConfig] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const fetchConfig = async () => {
    try {
      setIsFetching(true)
      const { data } = await configService.getConfigWithKey(key)
      console.log(data)
      setConfig(data)
    } catch (error) {
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  return [config, isFetching, fetchConfig]
}
