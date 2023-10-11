import { useMutation, useQuery, useQueryClient } from 'react-query'
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

export const useCreateProductHistory = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (productId: number) => {
      await apiPrivateRequest({
        url: '/product-history',
        method: 'POST',
        body: {
          productId,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('history-products')
      },
    },
  )
}

export const useProductHistory = () => {
  return useQuery(['history-products'], async () => {
    const response = await apiPrivateRequest({
      url: '/product-history',
      method: 'GET',
    })

    return response?.data?.map((data: any) => ({
      ...data?.Product,
      productHistoryId: data.id,
    }))
  })
}

export const useDeleteProductHistory = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id: number) => {
      await apiPrivateRequest({
        url: `/product-history/${id}`,
        method: 'DELETE',
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('history-products')
      },
    },
  )
}
