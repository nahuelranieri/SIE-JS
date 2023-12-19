import { Container, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import randomData from './randomData.json'
import { getAll, getById, updateById, deleteById } from '../../hooks/api';
import axios from 'axios';

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
    renderCell: (params) => {
      const onClick = (e) => {
        const currentRow = params.row;
        return alert(JSON.stringify(currentRow, null, 4));
      };
      return (
      <>
        <Tooltip title='Mostrar'>
          <IconButton><Visibility/></IconButton>
        </Tooltip>
        <Tooltip title='Editar'>
          <Link to="/edit">
            <IconButton onClick={onClick}>
              <Edit rowData={params.row}/>
            </IconButton>
          </Link>
        </Tooltip>
      </>
    )}
  }
];



export const TableComponent = () => {

  const [data, setData] = useState()
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAll();
        console.log('All Data:', allData.data);
        setData(allData.data)
        setDataReady(true);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [dataReady])


  return (
    <Container sx={{my:1}}>
      {dataReady ? (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  )
}
