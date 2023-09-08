import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import customTheme from './constants/customTheme'
import Routes from './routes'

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Routes />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
