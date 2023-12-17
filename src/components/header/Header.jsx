import { AppBar, Box, Toolbar, IconButton, Typography, Button, Drawer, Tooltip, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import {React, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { HelpOutline } from '@mui/icons-material';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon/>
            </IconButton>
            <Drawer
              anchor='left'
              open={isDrawerOpen}
              onClose={toggleDrawer}
            >
              <Tooltip/>
              <Divider/>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Menú
                  </ListSubheader>
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HelpOutline/>
                  </ListItemIcon>
                  <ListItemText primary='Posiciones'/>
                </ListItemButton>
              </List>
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SIE
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
      </AppBar>
    </Box>
  )
}
