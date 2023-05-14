import { LoadingButton } from '@mui/lab'
import { Grid, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'

interface IDebugMaintenanceForm {
  debugEnable: boolean
  maintenanceEnable: boolean
}

const DEFAULT_FORM: IDebugMaintenanceForm = {
  debugEnable: false,
  maintenanceEnable: false
}

export default function DebugMaintenance() {
  const [form, setForm] = useState<typeof DEFAULT_FORM>(DEFAULT_FORM)
  const [configIdDebug, setConfigDetailId] = useState<number | null>(null)
  const [configIdMaintenance, setConfigValueId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChangeSetting = (type: 'debug' | 'maintenance') => {
    if (type === 'debug') {
      setForm((prev) => ({
        ...prev,
        debugEnable: !prev.debugEnable
      }))
      return
    }
    setForm((prev) => ({
      ...prev,
      maintenanceEnable: !prev.maintenanceEnable
    }))
  }

  const getConfigSettings = async () => {
    try {
      const [debugRes, maintenanceRes] = await Promise.all([
        configService.getConfigWithKey('debug'),
        configService.getConfigWithKey('maintenance')
      ])
      const debugDetail = JSON.parse(debugRes?.data.value)
      if (typeof debugDetail !== 'undefined') {
        DEFAULT_FORM.debugEnable = debugDetail.debug_enabled
      }
      const maintenanceDetail = JSON.parse(maintenanceRes?.data.value)
      if (typeof maintenanceDetail !== 'undefined') {
        DEFAULT_FORM.maintenanceEnable = maintenanceDetail.maintenance_enabled
      }
      setConfigDetailId(Number(debugRes?.data?.id) || null)
      setConfigValueId(Number(maintenanceRes?.data?.id) || null)
      setForm(DEFAULT_FORM)
    } catch (error: unknown) {
      console.log(error as Error)
    }
  }
  useEffect(() => {
    getConfigSettings()
  }, [])

  const handleSubmitForm = async () => {
    try {
      setLoading(true)
      if (!configIdDebug || !configIdMaintenance) return
      const [debugRes, maintenanceRes] = await Promise.all([
        configService.updateConfigWithKey(configIdDebug, {
          value: {
            debug_enabled: form.debugEnable
          }
        }),
        configService.updateConfigWithKey(configIdMaintenance, {
          value: {
            maintenance_enabled: form.maintenanceEnable
          }
        })
      ])

      if (debugRes?.data && maintenanceRes?.data) {
        setIsSuccess(true)
      }
    } catch (error: unknown) {
      console.log(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Typography variant="h5" mb={4}>
        Debug & Maintenance
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <Typography mb={4}>Debug</Typography>

          <Switch
            checked={form.debugEnable}
            onChange={() => handleChangeSetting('debug')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography mb={4}>Maintenance</Typography>

          <Switch
            checked={form.maintenanceEnable}
            onChange={() => handleChangeSetting('maintenance')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
      </Grid>

      {isSuccess && (
        <Typography color="#28a745">
          Configurations updated successfully
        </Typography>
      )}

      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleSubmitForm}
        loading={loading}
        sx={{ mt: 2, mb: 2, width: '100%' }}
      >
        Update
      </LoadingButton>
    </div>
  )
}
