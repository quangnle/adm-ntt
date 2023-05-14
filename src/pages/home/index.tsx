import { useEffect, useState } from 'react'
import configService from '@/api/config'
import useFetchConfig from '@/hooks/useFetchConfig'
import ComponentModule, { registerComponentType } from '@/modules'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export default function Homepage() {
  const [config, isFetching, fetchConfig] = useFetchConfig<{ components: [] }>(
    'homepage'
  )
  const [form, setForm] = useState<
    {
      component: registerComponentType
      data: Record<string, string>
    }[]
  >([])
  useEffect(() => {
    setForm(config?.value?.components || [])
  }, [config])
  const [isCreating, setIsCreating] = useState(false)

  const handleChangeComponentForm = (
    index: number,
    newData: Record<string, string>
  ) => {
    const newForm = [...form]
    newForm[index].data = newData

    setForm(newForm)
  }

  const handleSubmitForm = async () => {
    if (!config?.id) return
    try {
      setIsCreating(true)
      const { data } = await configService.updateConfigWithKey(config.id, {
        value: {
          components: form
        }
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
          Homepage
        </Typography>

        <LoadingButton
          variant="contained"
          size="large"
          onClick={handleSubmitForm}
          loading={isCreating}
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
          {form?.map((comp, index) => (
            <ComponentModule
              key={index}
              {...comp}
              onChange={(data: unknown) =>
                handleChangeComponentForm(index, data as Record<string, string>)
              }
            />
          ))}
        </>
      )}
    </Stack>
  )
}
