import React, { useContext, Fragment } from 'react'
import { AppBar, Toolbar, Typography, Link, Divider, Box } from '@mui/material'
import routes from '../../commons/i18n/routes.json'
import UserContext from '../../context/user'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getRecomendationLabel } from '../../utils/recomendation'

const Header = () => {
  const { state } = useContext(UserContext)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href={routes.HOME} color="inherit" underline="none">
            FashionFusion
          </Link>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            borderRadius: 1,
            '& svg': {
              m: 1.5,
            },
            '& hr': {
              mx: 0.5,
            },
          }}
        >
          {state?.user ? (
            <>
              <AccountCircleIcon fontSize="large" />
              <Typography variant="body1">{`${state.user?.name} ${state.user?.lastname}`}</Typography>
            </>
          ) : (
            <>
              <Link href={routes.LOGIN} color="inherit" underline="none">
                Entrar
              </Link>
              <Box paddingX={1}>|</Box>
              <Link href={routes.REGISTER} color="inherit" underline="none">
                Cadastrar
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
      <Divider />
      {state?.user && (
        <Toolbar>
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Typography>Conheça seus produtos recomendados: </Typography>
            {state.user.recomendations.map((recomendation: string) => (
              <Fragment key={recomendation}>
                {recomendation && (
                  <Typography variant="body1" marginX={1}>
                    <Link
                      href={`/recomendation/${recomendation}`}
                      color="inherit"
                      underline="none"
                    >
                      {getRecomendationLabel(recomendation)}
                    </Link>
                  </Typography>
                )}
              </Fragment>
            ))}
          </Box>
        </Toolbar>
      )}
    </AppBar>
  )
}

export default Header
