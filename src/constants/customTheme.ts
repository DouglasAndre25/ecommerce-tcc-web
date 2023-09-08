import { Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { orange, purple } from '@mui/material/colors'

const customTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
    },
    primary: purple,
    secondary: orange,
  },
})

export default customTheme
