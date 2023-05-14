import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import UpdateConfig from './UpdateConfig'
import ChangePassword from './ChangePassword'
import useFetchConfig from '@/hooks/useFetchConfig'
import CircularProgress from '@mui/material/CircularProgress'
import ChangeLogo from './ChangeLogo'

export default function SettingPage() {
  const [data, isLoading] = useFetchConfig('contact')
  const [logoData, isLoadingLogo] = useFetchConfig('logo')
  return (
    <Stack pt={2}>
      <Typography variant="h3" mb={2}>
        Setting
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ p: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              height: '100%'
            }}
          >
            {isLoadingLogo ? (
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
            ) : (
              <ChangeLogo data={logoData as never} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ p: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              height: '100%'
            }}
          >
            {isLoading ? (
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
            ) : (
              <UpdateConfig data={data as never} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ p: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              height: '100%'
            }}
          >
            <ChangePassword />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}
