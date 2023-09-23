import React from 'react'
import { BrowserRouter, Route, Routes as RoutesDOM } from 'react-router-dom'
import routes from './commons/i18n/routes.json'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import RecomendationPage from './pages/recomendation'

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesDOM>
        <Route path={routes.REGISTER} Component={RegisterPage} />
        <Route path={routes.LOGIN} Component={LoginPage} />
        <Route path={routes.HOME} Component={HomePage} />
        <Route
          path={routes.RECOMENDATION_CATEGORY}
          Component={RecomendationPage}
        />
      </RoutesDOM>
    </BrowserRouter>
  )
}

export default Routes
