import { Outlet } from 'react-router-dom'

import AppLayout from '../'

const AppMain = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default AppMain
