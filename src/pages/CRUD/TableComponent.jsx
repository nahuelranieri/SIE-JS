import { Container, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Edit, AddCircle, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import randomData from './randomData.json'
import { getAll, getById, updateById, deleteById } from '../../hooks/api';
import axios from 'axios';





export const TableComponent = () => {

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      renderHeader: (params) => (
        <>
          {'Acciones'}
          <Tooltip title='Agregar'>
            <Link to={'/create'}>
              <IconButton><AddCircle/></IconButton>
            </Link>
          </Tooltip>
        </>
      ),
      width: 140,
      renderCell: (params) => {
        const handleDelete = async ()=> {
          try {
            await deleteById(params.row.id)
            setDataReady((prev) => !prev);
          } catch (error) {
            
          }
        }
        return (
        <>
          
          <Tooltip title='Editar'>
            <Link to={`/edit/${params.row.id}`} state={{rowData: params.row}}>
              <IconButton>
                <Edit/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title='Borrar'>
            <IconButton onClick={handleDelete}><Delete/></IconButton>
          </Tooltip>
        </>
      )}
    },
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
      field: 'mail',
      headerName: 'E-Mail',
      width: 150,
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
    
    
  ];

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
          
        />
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  )
}
