import { useState } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { Header } from './components/header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/CRUD/Edit'


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
