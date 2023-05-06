import configService from '@/api/config'
import PreviewDrawer from '@/components/preview-drawer'
import useFetchConfig from '@/hooks/useFetchConfig'
import ComponentModule, { registerComponentType } from '@/modules'
import { LoadingButton } from '@mui/lab'
import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Homepage() {
  const [config, _, fetchConfig] = useFetchConfig<{ components: [] }>(
    'homepage'
  )
  const [form, setForm] = useState<
    {
      component: registerComponentType
      data: object
    }[]
  >([])
  useEffect(() => {
    setForm(config?.value?.components || [])
  }, [config])
  const [isCreating, setIsCreating] = useState(false)

  const handleChangeComponentForm = <T extends object>(
    index: number,
    newData: T
  ) => {
    console.log(index, newData)
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
    <>
      <Typography variant="h3" mb={2}>
        Homepage
      </Typography>

      <PreviewDrawer width={600} url="https://ntt-solutions.techwiz.tech/" />

      {form?.map((comp, index) => (
        <Paper key={index} sx={{ p: 2, mb: 4 }}>
          <ComponentModule
            {...comp}
            onChange={(data) => handleChangeComponentForm(index, data)}
          />
        </Paper>
      ))}

      <LoadingButton
        variant="contained"
        sx={{ mx: 'auto', mt: 6 }}
        onClick={handleSubmitForm}
        loading={isCreating}
      >
        Update
      </LoadingButton>
    </>
  )
}
