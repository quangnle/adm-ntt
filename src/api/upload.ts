import axios from 'axios'

export const uploadFile = (formData: FormData) =>
  axios.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

const uploadService = {
  uploadFile
}

export default uploadService
