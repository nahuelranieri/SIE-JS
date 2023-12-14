import { AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material'
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
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
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SIE
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
      </AppBar>
    </Box>
  )
}
