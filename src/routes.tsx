import React from 'react'
import { BrowserRouter, Route, Routes as RoutesDOM } from 'react-router-dom'
import routes from './commons/i18n/routes.json'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import RecomendationPage from './pages/recomendation'
import ProductHistoryPage from './pages/productHistory'
import BagPage from './pages/bag'
import ProfilePage from './pages/profile'

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
        <Route path={routes.PRODUCT_HISTORY} Component={ProductHistoryPage} />
        <Route path={routes.BAG} Component={BagPage} />
        <Route path={routes.MY_PROFILE} Component={ProfilePage} />
      </RoutesDOM>
    </BrowserRouter>
  )
}

export default Routes
