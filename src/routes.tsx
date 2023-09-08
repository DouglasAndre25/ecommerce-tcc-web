import React from 'react'
import { BrowserRouter, Route, Routes as RoutesDOM } from 'react-router-dom'
import routes from './commons/i18n/routes.json'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesDOM>
        <Route path={routes.REGISTER} Component={RegisterPage} />
        <Route path={routes.LOGIN} Component={LoginPage} />
      </RoutesDOM>
    </BrowserRouter>
  )
}

export default Routes
