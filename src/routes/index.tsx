import { Route, Routes } from 'react-router-dom'

import AppMain from '@/layout/main'
import Login from '@/modules/auth/login'
import Dashboard from '@/modules/dashboard'
import PrivateRoute from './PrivateRoute'

const internalRoutes = [
  { name: 'Dashboard', path: '/', component: <Dashboard /> }
]

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
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
