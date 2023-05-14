import uploadService from '@/api/upload'
import { FormComponentError } from './type'
import { FormHelperText, FormLabel } from '@mui/material'

type UploadImageType = {
  label?: string
  value?: string
  onChange: (_: string) => void
  module: string
  imageAspect?: string
  mode?: 'cover' | 'contain'
} & FormComponentError

const UploadImage = ({
  label,
  value,
  onChange,
  module,
  imageAspect = '3/2',
  mode = 'cover',
  error,
  helperText
}: UploadImageType) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.length && e.target.files[0]
    if (file && /^image\//.test(file.type)) {
      const formData = new FormData()
      formData.append('module', module)
      formData.append('file', file)

      const { data } = await uploadService.uploadFile(formData)
      if (data?.url) {
        onChange(data?.url)
      }
    }
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          aspectRatio: imageAspect,
          border: '2px dashed #00000066',
          borderRadius: 20
        }}
      >
        <FormLabel sx={{ position: 'absolute', top: -24, left: 0 }}>
          {label}
        </FormLabel>
        {value && (
          <img
            src={value}
            style={{
              borderRadius: 24,
              padding: 10,
              width: '100%',
              aspectRatio: imageAspect,
              objectFit: mode
            }}
          />
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            cursor: 'pointer'
          }}
        />
      </div>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  )
}

export default UploadImage
