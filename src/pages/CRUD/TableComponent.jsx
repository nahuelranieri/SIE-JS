import { Container, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import randomData from './randomData.json'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'texto', headerName: 'Texto', width: 130 },
  { field: 'fecha', headerName: 'Fecha', width: 130 },
  {
    field: 'booleano',
    headerName: 'Booleano',
    type: 'boolean',
    width: 90,
  },
  {
    field: 'numero_entero',
    headerName: 'Entero',
    type: 'number',
    width: 90,
  },
  {
    field: 'numero_decimal',
    headerName: 'Decimal',
    type: 'number',
    width: 90,
  },
  {
    field: 'created_at',
    headerName: 'Creado',
    width: 90,
  },
  {
    field: 'updated_at',
    headerName: 'Actualizado',
    width: 90,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    width: 100,
    renderCell: (params) => (
      <>
        <Tooltip title='Mostrar'>
          <IconButton><Visibility/></IconButton>
        </Tooltip>
        <Tooltip title='Editar'>
          <Link to="/edit">
            <IconButton>
              <Edit/>
            </IconButton>
          </Link>
        </Tooltip>
      </>
    )
  }
];

const rows = randomData

export const TableComponent = () => {
  return (
    <Container sx={{my:1}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </Container>
  )
}
