import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../commons/i18n/routes.json'
import './styles.scss'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCreateUser } from '../../service/queries/user'

const RegisterPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const createUserRequest = useCreateUser()

  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      lastname: '',
      gender: '',
      birthday: '',
      phone: '',
      conditionsTerms: false,
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('O campo é obrigatório'),
      lastname: yup.string().required('O campo é obrigatório'),
      email: yup
        .string()
        .email('Formato inválido de email')
        .required('O campo é obrigatório'),
      password: yup
        .string()
        .required('O campo é obrigatório.')
        .min(6, 'A senha deve conter no mínimo 6 caracteres'),
      repeatPassword: yup
        .string()
        .required('O campo é obrigatório')
        .oneOf([yup.ref('password')], 'As senhas não coincidem'),
      cpf: yup
        .string()
        .required('O campo é obrigatório')
        .min(11, 'O CPF deve conter 11 caracteres'),
      phone: yup
        .string()
        .min(
          11,
          'O número do telefone deve conter 11 caracteres (não esqueça de incluir o DDD e o nono dígito)',
        ),
    }),
    onSubmit: async (values) => {
      const response = await createUserRequest.mutate({
        ...values,
      })

      console.log(response)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="registerContainer">
      <Box display="flex">
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
            <InputLabel htmlFor="name">Primeiro nome</InputLabel>
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              placeholder="Insira seu primeiro nome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.touched.name && formik.errors.name ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.name}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="lastname">Sobrenome</InputLabel>
            <TextField
              id="lastname"
              variant="outlined"
              fullWidth
              placeholder="Insira seu sobrenome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />

            {formik.touched.lastname && formik.errors.lastname ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.lastname}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              placeholder="Insira seu Email"
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
              variant="outlined"
              fullWidth
              placeholder="Crie uma senha"
              type="password"
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

          <Grid item xs={12}>
            <InputLabel htmlFor="repeatPassword">Repetir senha</InputLabel>
            <TextField
              id="repeatPassword"
              variant="outlined"
              fullWidth
              placeholder="Repita sua senha"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />

            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.repeatPassword}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="cpf">CPF</InputLabel>
            <TextField
              id="cpf"
              variant="outlined"
              fullWidth
              placeholder="00000000000"
              inputProps={{
                maxLength: 11,
              }}
              onChange={(e) => {
                const regex = /^[0-9\b]+$/
                if (e.target.value === '' || regex.test(e.target.value)) {
                  formik.handleChange(e)
                }
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cpf}
            />

            {formik.touched.cpf && formik.errors.cpf ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.cpf}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="birthday">
              Data de Nascimento (opcional)
            </InputLabel>
            <TextField
              id="birthday"
              variant="outlined"
              fullWidth
              placeholder="DD/MM/AAAA"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
            />

            {formik.touched.birthday && formik.errors.birthday ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.birthday}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="gender">Gênero (opcional)</InputLabel>
            <FormControl>
              <RadioGroup
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                name="gender"
                id="gender"
              >
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

            {formik.touched.gender && formik.errors.gender ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.gender}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="phone">Telefone (opcional)</InputLabel>
            <TextField
              id="phone"
              variant="outlined"
              fullWidth
              placeholder="00 0 00000000"
              inputProps={{
                maxLength: 11,
              }}
              onChange={(e) => {
                const regex = /^[0-9\b]+$/
                if (e.target.value === '' || regex.test(e.target.value)) {
                  formik.handleChange(e)
                }
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />

            {formik.touched.phone && formik.errors.phone ? (
              <Typography color={theme.palette.error.main}>
                {formik.errors.phone}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12} marginTop={2}>
            <FormControlLabel
              id="conditionsTerms"
              name="conditionsTerms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.conditionsTerms}
              control={<Checkbox />}
              label="Confirmo ser maior de 18 anos e concordo em permitir que o site utilize as informações da minha conta para melhorar a minha experiência como usuário"
            />
          </Grid>

          <Grid item xs={12} marginTop={4}>
            <Button variant="contained" fullWidth type="submit">
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
    </form>
  )
}

export default RegisterPage
