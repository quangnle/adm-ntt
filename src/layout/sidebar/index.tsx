import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import Toolbar from '@mui/material/Toolbar'
import InfoIcon from '@mui/icons-material/Info'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'

const drawerWidth = 240

interface IMenus {
  [key: string]: {
    value: string
    icon: JSX.Element
  }
}

const menus: IMenus = {
  setting: { value: 'General Settings', icon: <InboxIcon /> },
  homepage: { value: 'Home', icon: <HomeIcon /> },
  contact: { value: 'Contact', icon: <ContactPageIcon /> },
  'about-us': { value: 'About Us', icon: <InfoIcon /> },
  'list-form': { value: 'List Form', icon: <DescriptionIcon /> },
  'list-email': { value: 'List Email', icon: <MailIcon /> }
}

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
        {Object.keys(menus).map((text: string) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={`/admin/${text.toLowerCase()}`}
            >
              <ListItemIcon>{menus[text].icon}</ListItemIcon>
              <ListItemText primary={menus[text].value} />
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>
    </>
  )
}
