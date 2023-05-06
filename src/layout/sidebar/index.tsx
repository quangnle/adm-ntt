import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'

const drawerWidth = 240

export default function AppSidebar() {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        {['Homepage', 'Preview'].map((text: string, index: number) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={`/admin/${text.toLowerCase()}`}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>
    </>
  )
}
