import { useState } from 'react'

const useDrawer = (): [
  boolean,
  (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
  (open: boolean) => void
] => {
  const [showDrawer, setShowDrawer] = useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log('click')
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setShowDrawer(open)
    }

  return [showDrawer, toggleDrawer, setShowDrawer]
}

export default useDrawer
