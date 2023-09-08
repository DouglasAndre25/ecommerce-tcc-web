import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../commons/i18n/routes.json'

const RegisterPage = () => {
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
        marginX={80}
        boxShadow="0 1px 1px 0 rgba(0, 0, 0, 0.14)"
        padding={5}
        marginTop={50}
      >
        <Grid item xs={12}>
          <Typography variant="caption">Primeiro nome</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Insira seu primeiro nome"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Sobrenome</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Insira seu sobrenome"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Email</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Insira seu Email"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Senha</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Crie uma senha"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Repetir senha</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Repita sua senha"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">CPF</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="000.000.000-00"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">
            Data de Nascimento (opcional)
          </Typography>
          <TextField variant="outlined" fullWidth placeholder="DD/MM/AAAA" />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <Typography variant="caption">Gênero (opcional)</Typography>
            <RadioGroup name="radio-buttons-group">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Feminino"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Masculino"
              />
              <FormControlLabel
                value="noSpecify"
                control={<Radio />}
                label="Não especificar"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Telefone (opcional)</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="(00) 0 0000-0000"
          />
        </Grid>

        <Grid item xs={12} marginTop={2}>
          <FormControlLabel
            control={<Checkbox />}
            label="Confirmo ser maior de 18 anos e concordo em permitir que o site utilize as informações da minha conta para melhorar a minha experiência como usuário"
          />
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Button variant="contained" fullWidth>
            Criar conta
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate(routes.LOGIN)}
          >
            Já possuo uma conta
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RegisterPage
