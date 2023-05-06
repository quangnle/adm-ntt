import { ValidationError } from 'yup'

export const convertErrorYup = (error: ValidationError) => {
  if (error.name !== 'ValidationError') {
    return error
  }

  const errors = {}
  error.inner.forEach((err) => {
    if (!errors[err.path as keyof typeof errors]) {
      Object.assign(errors, { [err.path as string]: err.message })
    }
  })

  return errors
}

export default {
  convertErrorYup
}
