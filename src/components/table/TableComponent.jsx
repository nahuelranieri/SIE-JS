import { Container, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
    type: 'dateTime',
    width: 90,
  },
  {
    field: 'updated_at',
    headerName: 'Actualizado',
    type: 'dateTime',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const TableComponent = () => {
  

  return (
    <Container sx={{my:1}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 15]}
        checkboxSelection
      
      />
    </Container>
  )
}
