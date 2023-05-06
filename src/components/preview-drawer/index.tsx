import { Button, Drawer } from '@mui/material'
import { useState } from 'react'

export default function PreviewDrawer({
  width,
  url
}: {
  width: number
  url: string
}) {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => setShow(true)}>Preview</Button>
      <Drawer
        open={show}
        anchor="right"
        onClose={() => setShow(false)}
        PaperProps={{
          sx: {
            width: width
          }
        }}
      >
        <iframe
          src={url}
          style={{
            width: '1440px',
            height: '1440px',
            transform: `scale(${width / 1440})`,
            transformOrigin: 'top left'
          }}
        />
      </Drawer>
    </>
  )
}
