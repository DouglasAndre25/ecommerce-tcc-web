import React from 'react'
import { Box, Grid, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../commons/i18n/routes.json'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      height="100%"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        marginX={70}
        boxShadow="0 1px 1px 0 rgba(0, 0, 0, 0.14)"
        padding={7}
      >
        <Grid item xs={12}>
          <Typography variant="caption">Login</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Digite seu email"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Senha</Typography>
          <TextField
            variant="outlined"
            placeholder="ex: ••••••••••••"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} marginBottom={2} marginTop={1}>
          <Button fullWidth variant="contained">
            Entrar
          </Button>
        </Grid>

        <Grid item xs={12} marginTop={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(routes.REGISTER)}
          >
            Registrar-se
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginPage
