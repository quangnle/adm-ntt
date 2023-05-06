import { Route, Routes } from 'react-router-dom'

import AppMain from '@/layout/main'
import Login from '@/pages/auth/login'
import Dashboard from '@/pages/dashboard'
import PrivateRoute from './PrivateRoute'
import Homepage from '@/pages/home'

const internalRoutes = [
  { name: 'Dashboard', path: '/admin', component: <Dashboard /> },
  { name: 'Homepage', path: '/admin/homepage', component: <Homepage /> }
]

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AppMain />
          </PrivateRoute>
        }
      >
        {internalRoutes?.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.component}</PrivateRoute>}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default AppRoutes
