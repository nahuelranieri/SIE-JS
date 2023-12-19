import { Card, CardContent, FormControlLabel, Switch, Container, TextField, Typography, Divider, Grid, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Save } from '@mui/icons-material';
import { addNew } from '../../hooks/api';

const Create = () => {

  const [switchValue, setSwitchValue] = useState(false);
  const [newData,setNewData ] = useState([])

  const handleSwitchChange = (event) => {
    const newValue = event.target.checked;

    setSwitchValue(newValue);

    // Aquí decides qué valor asignar al campo correspondiente en newData
    const booleanValue = newValue ? true : false;

    setNewData((prevInfo) => ({
      ...prevInfo,
      booleano: booleanValue,
    }));
  };

  const handleInputChange = (fieldName, value) => {
    setNewData((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  };

  const handleSaveClick = async ()=> {
    try {
      await addNew(newData)
      console.log(newData);
    } catch (error) {
      
    }
  }

  return (
    <Container sx={{ my: 1 }}>
      <Card>
        <CardContent>
          <Typography variant='h6'> Crear datos</Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
                onChange={(e) => handleInputChange('texto', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha"
                fullWidth
                onChange={(e) => handleInputChange('fecha', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                control={<Switch checked={switchValue} onChange={handleSwitchChange} />}
                label="Es booleano?"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Numero decimal"
                fullWidth
                onChange={(e) => handleInputChange('numero_decimal', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Numero entero"
                fullWidth
                onChange={(e) => handleInputChange('numero_entero', e.target.value)}
              />
            </Grid>
          </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSaveClick}
                endIcon={<Save />}>
                Crear Datos
              </Button>
            </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Create