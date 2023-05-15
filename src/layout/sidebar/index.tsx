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
import InventoryIcon from '@mui/icons-material/Inventory'
import { Link } from 'react-router-dom'
import {
  AppsRounded,
  ArchiveRounded,
  CategoryRounded
} from '@mui/icons-material'
import { List } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'

const drawerWidth = 240

interface ISubMenu {
  [key: string]: {
    value: string
    icon: JSX.Element
  }
}

interface IMenu {
  value: string
  icon: JSX.Element
  submenu?:
    | ISubMenu
    | {
        [key: string]: {
          value: string
          icon: JSX.Element
        }
      }
}

interface IMenus {
  [key: string]: IMenu
}
const menus: IMenus = {
  setting: { value: 'General Settings', icon: <InboxIcon /> },
  homepage: { value: 'Home', icon: <HomeIcon /> },
  'products-solutions': {
    value: 'Products & Solutions',
    icon: <ArchiveRounded />,
    submenu: {
      groups: {
        value: 'Groups',
        icon: <AppsRounded />
      },
      categories: {
        value: 'Categories',
        icon: <CategoryRounded />
      },
      products: { value: 'Products', icon: <InventoryIcon /> }
    }
  },
  contact: {
    value: 'Contact',
    icon: <ContactPageIcon />,
    submenu: {
      'list-form': { value: 'List Form', icon: <DescriptionIcon /> },
      'list-email': { value: 'List Email', icon: <MailIcon /> }
    }
  },
  'about-us': { value: 'About Us', icon: <InfoIcon /> },
  'phrases-load': { value: ' Phrases Load', icon: <SettingsIcon /> }
}

export default function AppSidebar() {
  function getCurrentURL() {
    const url = window.location.href
    const urlCurrent = url?.split('/').pop()
    return urlCurrent
  }
  const url = getCurrentURL()
  const [openSubMenu, setOpenSubMenu] = useState('')

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
        {Object.entries(menus).map(([key, { value, icon, submenu }]) => {
          const isSelected = key === url
          const isSubMenuOpen = key === openSubMenu
          const handleItemClick = () => {
            setOpenSubMenu(key === openSubMenu ? '' : key)
          }

          return (
            <ListItem
              key={key}
              disablePadding
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start'
              }}
            >
              <ListItemButton
                component={Link}
                to={`/admin/${key.toLowerCase()}`}
                selected={isSelected}
                onClick={handleItemClick}
                style={{ width: '100%' }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={value} />
                {submenu &&
                  (isSubMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
              {submenu && (
                <Collapse
                  in={isSubMenuOpen}
                  timeout="auto"
                  style={{ width: '100%' }}
                >
                  <List component="div" disablePadding>
                    {Object.entries(submenu).map(
                      ([subKey, { value: subValue, icon: subIcon }]) => (
                        <ListItemButton
                          component={Link}
                          to={`/admin/${subKey.toLowerCase()}`}
                          key={subKey}
                          style={{
                            width: '100%',
                            paddingLeft: '30px',
                            background: subKey === url ? '#edf4fb' : ''
                          }}
                        >
                          <ListItemIcon>{subIcon}</ListItemIcon>
                          <ListItemText primary={subValue} />
                        </ListItemButton>
                      )
                    )}
                  </List>
                </Collapse>
              )}
            </ListItem>
          )
        })}
      </Drawer>
    </>
  )
}
