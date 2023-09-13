import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/user'
import routes from '../commons/i18n/routes.json'

const useRedirectAnonymous = () => {
  const navigate = useNavigate()
  const { state: userData } = useContext(UserContext)

  useEffect(() => {
    if (!userData) {
      navigate(routes.LOGIN)
    }
  }, [userData])
}

export default useRedirectAnonymous
