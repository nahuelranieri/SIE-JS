import { useState } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { Header } from './components/header/Header'
import { TableComponent } from './components/table/TableComponent'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Edit from './components/table/edit'

function App() {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/edit' element={<Edit/>}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
