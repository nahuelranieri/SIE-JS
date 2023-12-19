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
  Alert,
} from '@mui/material'
import { React, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { updateById } from '../../hooks/api';

const Edit = () => {
  const { state, pathname } = useLocation();
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  
  const rowData = state?.rowData || null;

  const handleInputChange = (fieldName, value) => {
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      id: rowData.id,
      [fieldName]: value,
    }));
  };

  const validateFields = () => {
    for (const key in updatedInfo) {
      if (!updatedInfo[key]) {
        return false; 
      }
    }
    return true; 
  };

  const handleSaveClick = async () => {
    try {
      if (validateFields()) {
        await updateById(rowData.id, updatedInfo)
        console.log(updatedInfo);
        setAlertSuccess(true)
      } else {
        console.log('Por favor, completa todos los campos');
        setAlertError(true)
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // console.log('Datos para editar:', rowData);
  // console.log('URL:', pathname);
  return (
    <Container sx={{ my: 1 }}>
      <Card>
        <CardContent>
          <Typography variant='h6'> Edita tus datos</Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Id"
                fullWidth
                defaultValue={rowData.id}

              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Texto"
                fullWidth
                defaultValue={rowData.texto}
                onChange={(e) => handleInputChange('texto', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Booleano"
                fullWidth
                defaultValue={rowData.booleano}
                onChange={(e) => handleInputChange('booleano', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Numero decimal"
                fullWidth
                defaultValue={rowData.numero_decimal}
                onChange={(e) => handleInputChange('numero_decimal', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Numero entero"
                fullWidth
                defaultValue={rowData.numero_entero}
                onChange={(e) => handleInputChange('numero_entero', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha"
                fullWidth
                defaultValue={format(rowData.fecha, 'HH:mm dd/MM/yyyy')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Creado"
                fullWidth
                defaultValue={format(rowData.created_at, 'HH:mm dd/MM/yyyy')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Actualizado"
                fullWidth
                defaultValue={format(rowData.updated_at, 'HH:mm dd/MM/yyyy')}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              endIcon={<Save />}>
              Guardar Datos
            </Button>
          </Box>
            {alertError && (
              <Alert sx={{ mt: 2 }} onClose={() => { setAlertError(false) }} variant="outlined" severity="error">
                Debes completar todos los campos
              </Alert>)}
            {alertSuccess && (
              <Alert sx={{ mt: 2 }} onClose={() => { setAlertSuccess(false) }} variant="outlined" severity="success">
                ¡Datos actualizados!
              </Alert>
            )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default Edit