import { Save } from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material'
import { React, useRef, useState } from 'react'

const Edit = () => {
 

  return (
    <Container sx={{ my: 1 }}>
      <Card>
        <CardContent>
          <Typography variant='h6'> Edita tus datos</Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{display:'flex', justifyContent:'center', mt: 2}}>
            <Button
              variant="contained"
              endIcon={<Save />}>
              Guardar Datos
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Edit