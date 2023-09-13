import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import customTheme from './constants/customTheme'
import Routes from './routes'
import GlobalContext from './context'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <GlobalContext>
          <Routes />
          <CssBaseline />
        </GlobalContext>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
