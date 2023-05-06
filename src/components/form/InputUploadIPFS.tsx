import ipfsService from '@/api/ipfs'
import { IPFS_URL } from '@/constants'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import LinkIcon from '@mui/icons-material/Link'
import { forwardRef, useState } from 'react'

type InputUploadIPFSProps = TextFieldProps & {
  onUploaded: (url: string) => void
}

const InputUploadIPFS = forwardRef(
  (props: InputUploadIPFSProps, ref): React.ReactElement => {
    const { onUploaded, ...otherProps } = props
    const [isUploading, setIsUploading] = useState(false)

    const handleUploadImage = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      try {
        setIsUploading(true)

        const { files } = event.target
        const selectedFile = files && files[0]
        if (selectedFile) {
          const bodyData = new FormData()
          bodyData.append('file', selectedFile)
          const { data } = await ipfsService.upload(bodyData)

          if (data.success) {
            const imageUrl = `${IPFS_URL}/ipfs/${data.data}`
            onUploaded && onUploaded(imageUrl)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsUploading(false)
      }
    }

    const openImageUrl = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    const clearImageUrl = () => {
      onUploaded && onUploaded('')
    }

    return (
      <TextField
        inputRef={ref}
        {...otherProps}
        disabled={isUploading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LoadingButton
                component="label"
                variant="contained"
                loading={isUploading}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleUploadImage}
                />
              </LoadingButton>
            </InputAdornment>
          ),
          endAdornment: otherProps.value ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => openImageUrl(otherProps.value as string)}
                disableFocusRipple
              >
                <LinkIcon />
              </IconButton>
              <IconButton onClick={clearImageUrl} disableFocusRipple>
                <DeleteSweepIcon />
              </IconButton>
            </InputAdornment>
          ) : (
            <></>
          )
        }}
      />
    )
  }
)

export default InputUploadIPFS
