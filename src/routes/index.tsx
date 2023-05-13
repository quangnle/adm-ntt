import { Route, Routes } from 'react-router-dom'

import AppMain from '@/layout/main'
import Login from '@/pages/auth/login'
import Dashboard from '@/pages/dashboard'
import PrivateRoute from './PrivateRoute'
import Homepage from '@/pages/home'
import SettingPage from '@/pages/setting'
import ContactPage from '@/pages/contact'
import AboutUsPage from '@/pages/about-us'
import ListFormPage from '@/pages/list-form'
import ListEmailPage from '@/pages/list-email'
import ProductPage from '@/pages/product'

const internalRoutes = [
  { name: 'Dashboard', path: '/admin', component: <Dashboard /> },
  { name: 'Homepage', path: '/admin/homepage', component: <Homepage /> },
  { name: 'Products', path: '/admin/products', component: <ProductPage /> },
  { name: 'Setting', path: '/admin/setting', component: <SettingPage /> },
  { name: 'Contact', path: '/admin/contact', component: <ContactPage /> },
  { name: 'AboutUs', path: '/admin/about-us', component: <AboutUsPage /> },
  { name: 'ListForm', path: '/admin/list-form', component: <ListFormPage /> },
  { name: 'ListEmail', path: '/admin/list-email', component: <ListEmailPage /> }
]

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />

      <Route path="/admin" element={<AppMain />}>
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
