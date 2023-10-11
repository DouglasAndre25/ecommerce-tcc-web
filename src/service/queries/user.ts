import { useMutation } from 'react-query'
import { apiPublicRequest } from '../requests'
import { UserDataProps } from '../../types/user'

export const useCreateUser = () => {
  return useMutation(async (userData: UserDataProps) => {
    const { ip } = await fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .catch((error) => ({ ip: null }))

    const response = await apiPublicRequest({
      url: '/user',
      body: {
        cpf: userData.cpf,
        name: userData.name,
        lastname: userData.lastname,
        gender: userData.gender?.length ? userData.gender : undefined,
        birthday: userData.birthday?.length ? userData.birthday : undefined,
        phone: userData.phone?.length ? userData.phone : undefined,
        conditionsTerms: userData.conditionsTerms,
        email: userData.email,
        password: userData.password,
        ip,
      },
      method: 'POST',
    })

    return response ?? {}
  })
}

export const useLogin = () => {
  return useMutation(async (userData: { email: string; password: string }) => {
    const { ip } = await fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .catch((error) => ({ ip: null }))

    const response = await apiPublicRequest({
      url: '/login',
      body: {
        email: userData.email,
        password: userData.password,
        ip,
      },
      method: 'POST',
    })
    return response ?? {}
  })
}
