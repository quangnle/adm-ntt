import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AuthActions } from '@/store/auth'
import { clearSession } from '@/utils/api'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, IconButton, Stack, Toolbar } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import AppSidebar from './sidebar'
import { AppDispatch } from '@/store'

const AppLayout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleClickLogout = () => {
    clearSession()
    dispatch(AuthActions.logout())
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={1}
          >
            <Stack>
              <IconButton
                aria-label="logout"
                onClick={handleClickLogout}
                sx={{ color: 'white' }}
              >
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <AppSidebar />

      <Box
        component="main"
        sx={{
          p: 2,
          flexGrow: 1,
          bgcolor: 'background.default',
          pt: 8,
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout
