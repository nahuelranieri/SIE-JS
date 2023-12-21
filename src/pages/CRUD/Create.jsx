import { yupResolver } from '@hookform/resolvers/yup';
import { Save } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Container, Divider, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { error } from 'console';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addNew } from '../../hooks/api';

const schema = yup.object().shape({
  texto: yup.string().required('El nombre es obligatorio'),
  fecha: yup.date().required('La fecha es obligatoria'),
  booleano: yup.boolean(),
  mail: yup.string()
  .email('Formato de correo electrónico no válido')
  .required('El correo electrónico es obligatorio')
  .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, 'El formato debe ser example@example.com'),
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
});
const Create = () => {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    data.fecha = format(data.fecha, 'yyyy-MM-dd HH:mm:ss');
    console.log('La data antes de la llamada', data);
    try {
      await addNew(data)
      setAlertSuccess(true)
    } catch (error) {
      console.log('La data desoues de la llamada', error);
    }
  };


  return (
    <Container sx={{ my: 1 }}>
      <Card>
        <CardContent>
          <Typography variant='h6'> Crear datos</Typography>
          <Divider sx={{ mb: 1 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
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
              </Grid>
              <Grid item xs={6} md={6} >
                <Controller
                  name="fecha"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      disablePast='true'
                      format="dd-MM-yyyy"
                      slotProps={{
                        textField:{
                          
                          helperText: errors.fecha?.message,
                          error: !!errors.fecha,
                          fullWidth: true
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} md={6} sx={{display: 'flex', justifyContent: 'center',}}>
                <FormControlLabel
                  control={
                    <Controller
                      name="booleano"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label="Es booleano?"
                />
              </Grid>
              <Grid item xs={12} md={6} >
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
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                <Button type="submit" variant="contained" endIcon={<Save />} color="primary">
                  Crear Datos
                </Button>
                {alertSuccess && (
                  <Alert onClose={() => {setAlertSuccess(false)}} variant="outlined" severity="success">
                    ¡Datos cargados!
                  </Alert>
                )}
              </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Create