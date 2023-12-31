import React, { useContext, useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  InputLabel,
  Typography,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../commons/i18n/routes.json'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './styles.scss'
import { useLogin } from '../../service/queries/user'
import UserContext from '../../context/user'
import useRedirectLogged from '../../hooks/useRedirectLogged'
import Modal from '../../components/Modal'

const LoginPage = () => {
  useRedirectLogged()

  const navigate = useNavigate()
  const theme = useTheme()
  const loginRequest = useLogin()
  const { setState: setUserState } = useContext(UserContext)

  const [errorMessage, setErrorMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Formato inválido de email')
        .required('O campo é obrigatório'),
      password: yup.string().required('O campo é obrigatório'),
    }),
    onSubmit: async (values) => {
      const response = await loginRequest.mutateAsync({
        email: values.email,
        password: values.password,
      })

      if (response.data) {
        setUserState(response.data)
        navigate(routes.HOME)
      } else if (response.error) {
        setErrorMessage(response.error.message)
        setOpenModal(true)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="loginContainer">
      <Box display="flex">
        <Grid
          container
          spacing={2}
          alignItems="center"
          marginX={70}
          boxShadow="0 1px 1px 0 rgba(0, 0, 0, 0.14)"
          padding={7}
        >
          <Grid item xs={12}>
            <InputLabel htmlFor="email">Login</InputLabel>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              placeholder="Digite seu email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.email}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              placeholder="ex: ••••••••••••"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.password}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12} marginBottom={2} marginTop={1}>
            <Button fullWidth variant="contained" type="submit">
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

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
        title={'Erro ao entrar na conta'}
      >
        <Typography variant="body1">{errorMessage}</Typography>
      </Modal>
    </form>
  )
}

export default LoginPage
