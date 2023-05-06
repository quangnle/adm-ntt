import { useEffect } from 'react'

export default function useInitialForm<T extends object>(
  data: T,
  defaultForm: T,
  onChange: (data: T) => void
) {
  const mergeObject = () => {
    const result = Object.keys(defaultForm).reduce((obj, key) => {
      return {
        ...obj,
        [key]: data[key as keyof T] || defaultForm[key as keyof T]
      }
    }, {})
    onChange(result as T)
  }
  useEffect(() => {
    mergeObject()
  }, [])
}
