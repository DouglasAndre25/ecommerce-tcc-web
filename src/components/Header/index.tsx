import React, { useContext, Fragment, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Divider,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import routes from '../../commons/i18n/routes.json'
import UserContext from '../../context/user'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getRecomendationLabel } from '../../utils/recomendation'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import BagContext from '../../context/bag'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { state } = useContext(UserContext)
  const { state: bagState } = useContext(BagContext)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          fontStyle="italic"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
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
            <Box display="flex" alignItems="center">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <IconButton
                  onClick={() => {
                    window.location.pathname = routes.BAG
                  }}
                >
                  <ShoppingBagIcon fontSize="large" sx={{ color: 'white' }} />
                </IconButton>
                <div
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  {bagState?.ProductBags?.length}
                </div>
              </div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <AccountCircleIcon fontSize="large" />
                  <Typography variant="body1">{`${state.user?.name} ${state.user?.lastname}`}</Typography>
                </Box>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    window.location.pathname = routes.MY_PROFILE
                  }}
                >
                  Meu perfil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.pathname = routes.PRODUCT_HISTORY
                  }}
                >
                  Histórico de produtos
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.pathname = routes.LOGIN
                  }}
                >
                  Sair
                </MenuItem>
              </Menu>
            </Box>
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
