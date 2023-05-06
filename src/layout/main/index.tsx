import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import AppLayout from '../'

const AppMain = () => {
  return (
    <AppLayout>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </AppLayout>
  )
}

export default AppMain
