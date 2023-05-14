import configService from '@/api/config'
import useFetchConfig from '@/hooks/useFetchConfig'
import ProductThumbnails from '@/modules/products-thumbnail'
import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'

interface Props {}

const ProductsSolutions: FC<Props> = () => {
  const [config, isFetching, fetchConfig] = useFetchConfig<any>('products')
  const [form, setForm] = useState<any>()
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    setForm(config?.value)
  }, [config?.value])

  const handleSubmitForm = async () => {
    if (!config?.id) return
    try {
      setIsCreating(true)
      const { data } = await configService.updateConfigWithKey(config.id, {
        value: form
      })
      if (data) {
        fetchConfig()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Stack sx={{ width: '100%', pt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" mb={2}>
          Products & Solutions
        </Typography>

        <LoadingButton
          onClick={handleSubmitForm}
          loading={isCreating}
          variant="contained"
          size="large"
        >
          Update
        </LoadingButton>
      </Stack>

      {isFetching ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <ProductThumbnails
            data={{
              content: '',
              ...form
            }}
            onChange={(data) => setForm(data)}
          />
        </>
      )}
    </Stack>
  )
}

export default ProductsSolutions
