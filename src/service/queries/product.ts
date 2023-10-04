import { useQuery } from 'react-query'
import {
  apiPrivateRequest,
  apiPublicRequest,
  apiRecomendationPublicRequest,
} from '../requests'

export const useProducts = (total: number) => {
  return useQuery(['products', total], async () => {
    const response = await apiPublicRequest({
      url: `/products?total=${total}`,
      method: 'GET',
    })

    return response
  })
}

export const useProductRecomendation = (category: string, params: string) => {
  const {
    user: { id: userId },
  } = JSON.parse(sessionStorage.getItem('user') ?? '{}')
  return useQuery(
    ['recomendation-products', category, params, userId],
    async () => {
      const response = await apiRecomendationPublicRequest({
        url: `/api/recommended/${userId}?category=${category}&param=${params}`,
        method: 'GET',
      })

      return response
    },
  )
}

export const useProductHistory = () => {
  return useQuery(['history-products'], async () => {
    const response = await apiPrivateRequest({
      url: '/product-history',
      method: 'GET',
    })

    console.log(response?.data?.map((data: any) => data?.Product))

    return response?.data?.map((data: any) => data?.Product)
  })
}
