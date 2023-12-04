import React, { useContext } from 'react'
import { Paper, Box, Typography, Grid, Button } from '@mui/material'
import UserContext from '../../context/user'

const ProfilePage = () => {
  const { state: userData } = useContext(UserContext)

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100%"
      justifyContent="space-evenly"
      alignItems="center"
      marginTop="-40px"
    >
      <Paper elevation={3} sx={{ height: '400px' }}>
        <Box p={2}>
          <Typography variant="h4">Informações do Usuário</Typography>
          <Typography variant="body1">
            <b>Nome:</b> {userData?.user?.name} {userData?.user?.lastname}
          </Typography>
          <Typography variant="body1">
            <b>Gênero:</b> {userData?.user?.gender}
          </Typography>
          <Typography variant="body1">
            <b>Data de Nascimento:</b> {userData?.user?.birthday}
          </Typography>
          <Typography variant="body1">
            <b>Telefone:</b> {userData?.user?.phone}
          </Typography>
          <Typography variant="body1">
            <b>Aceitou os Termos e Condições:</b>{' '}
            {userData?.user?.conditionsTerms ? 'Sim' : 'Não'}
          </Typography>
          <Typography variant="body1">
            <b>Email:</b> {userData?.user?.email}
          </Typography>
          <Grid container spacing={2} position="relative" top="140px">
            <Grid item>
              <Button variant="contained" color="primary">
                Editar
              </Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" color="primary">
                Excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ height: '400px' }}>
        <Box p={2}>
          <Typography variant="h4">Informações de Endereço</Typography>
          <Typography variant="body1">
            <b>CEP:</b> {userData?.user?.address?.postalCode}
          </Typography>
          <Typography variant="body1">
            <b>Rua:</b> {userData?.user?.address?.street}
          </Typography>
          <Typography variant="body1">
            <b>Número da Residência:</b> {userData?.user?.address?.houseNumber}
          </Typography>
          <Typography variant="body1">
            <b>Complemento:</b> {userData?.user?.address?.complement}
          </Typography>
          <Typography variant="body1">
            <b>Ponto de Referência:</b>{' '}
            {userData?.user?.address?.referencePoint}
          </Typography>
          <Typography variant="body1">
            <b>País:</b> {userData?.user?.address?.country}
          </Typography>
          <Typography variant="body1">
            <b>Estado:</b> {userData?.user?.address?.state}
          </Typography>
          <Typography variant="body1">
            <b>Cidade:</b> {userData?.user?.address?.city}
          </Typography>
          <Typography variant="body1">
            <b>Apelido do Endereço:</b> {userData?.user?.address?.nickname}
          </Typography>
          <Grid container spacing={2} position="relative" top="70px">
            <Grid item>
              <Button variant="contained" color="primary">
                Editar
              </Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" color="primary">
                Excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfilePage
