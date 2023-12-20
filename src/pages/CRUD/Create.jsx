import { yupResolver } from '@hookform/resolvers/yup';
import { Save } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Divider, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { error } from 'console';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  texto: yup.string().required('El texto es obligatorio'),
  fecha: yup.date().required('La fecha es obligatoria'),
  mail: yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es obligatorio'),
  numero_decimal: yup.number()
  .typeError('Debe ser un número')
  .required('El número decimal es obligatorio')
  .test('max-decimales', 'Máximo 2 decimales permitidos', value => {
    const [, decimalPart] = value.toString().split('.');
    return decimalPart === undefined || decimalPart.length <= 2;
  })
  .test('tiene-decimal', 'Debe tener al menos un decimal', value => {
    const [, decimalPart] = value.toString().split('.');
    return decimalPart !== undefined;
  }),
  numero_entero: yup.number()
  .typeError('Debe ser un número entero')
  .integer('Debe ser un número entero')
  .required('El número entero es obligatorio'),
})
const Create = () => {

  const [switchValue, setSwitchValue] = useState(false);
  const [newData, setNewData] = useState({ booleano: false });

  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(schema),
    
  });

  const handleSwitchChange = (event) => {
    const newValue = event.target.checked;
    setSwitchValue(newValue);
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

  // const handleSaveClick = async () => {
  //   try {
  //     // await addNew(newData)
  //     console.log(newData);
  //   } catch (error) {

  //   }
  // }
  const handleSaveClick = () => {
    console.log("Handle Save Click se llamó");
    const data = getValues(); // Obtiene los valores del formulario
    console.log("Valores correctos del formulario:", data);
    // Aquí puedes realizar otras acciones con los datos correctos, como enviarlos a la API.
  };
  

  return (
    <Container sx={{ my: 1 }}>
      <Card>
        <CardContent>
          <Typography variant='h6'> Crear datos</Typography>
          <Divider sx={{ mb: 1 }} />
          <form onSubmit={handleSubmit(handleSaveClick)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
              <Controller
                    name="texto"
                    control={control}
                    defaultValue=""
                    
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Texto"
                        fullWidth
                        error={!!errors.texto}
                        helperText={errors.texto?.message}
                       
                      />
                    )}
                  />
                {/* <TextField
                  required
                  label="Texto"
                  fullWidth
                  onChange={(e) => handleInputChange('texto', e.target.value)}
                /> */}
              </Grid>
              <Grid item xs={6} md={6}>
              <Controller
                name="fecha"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    disablePast
                    format="dd-MM-yyyy"
                    // error={!!errors.fecha}
                    // helperText={errors.fecha?.message}
                    slotProps={{
                      textField:{
                        helperText: errors.fecha?.message,
                        error: !!errors.fecha
                      }
                    }}
                    onChange={(date) => {
                      const formattedDate = date ? format(date, 'yyyy-MM-dd HH:mm:ss') : null;
                      handleInputChange('fecha', formattedDate);
                    }}
                  />
                )}
              />
                {/* <DatePicker
                  disablePast='true'
                  format="dd-MM-yyyy"
                  onChange={(date) => {
                    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
                    // console.log('El valor es:', formattedDate);
                    handleInputChange('fecha', formattedDate);
                  }} /> */}
              </Grid>
              <Grid item xs={4} md={4}>
                <FormControlLabel
                  control={<Switch checked={switchValue} onChange={handleSwitchChange} />}
                  label="Es booleano?"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* <TextField
                  required
                  label="Mail"
                  fullWidth
                  onChange={(e) => handleInputChange('mail', e.target.value)}
                /> */}
                <Controller
                  name="mail"
                  control={control}
                  defaultValue=""
                  
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mail"
                      fullWidth
                      error={!!errors.mail}
                      helperText={errors.mail?.message}
                      
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
              <Controller
                  name="numero_decimal"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Numero decimal"
                      fullWidth
                      error={!!errors.numero_decimal}
                      helperText={errors.numero_decimal?.message}
                      
                    />
                  )}
                />
                {/* <TextField
                  required
                  label="Numero decimal"
                  fullWidth
                  onChange={(e) => handleInputChange('numero_decimal', e.target.value)}
                /> */}
              </Grid>

              <Grid item xs={12} md={4}>
              <Controller
                  name="numero_entero"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Numero entero"
                      fullWidth
                      error={!!errors.numero_entero}
                      helperText={errors.numero_entero?.message}
                      
                    />
                  )}
                />
                {/* <TextField
                  required
                  label="Numero entero"
                  fullWidth
                  onChange={(e) => handleInputChange('numero_entero', e.target.value)}
                /> */}
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                // onClick={handleSaveClick}
                endIcon={<Save />}
                type="submit">
                Crear Datos
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Create