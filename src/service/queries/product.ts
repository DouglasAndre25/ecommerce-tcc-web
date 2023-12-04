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
      console.log(
        response?.map((product: any) => product?.name + ' - ' + product?.brand),
      )
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
    console.log(
      response?.data?.map(
        (product: any) =>
          product?.Product?.name + ' - ' + product?.Product?.brand,
      ),
    )
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

interface UseBuyProductParams {
  productId: number
  quantity: number
}

export const useBuyProduct = () => {
  const { id: bagId } = JSON.parse(sessionStorage.getItem('bag') ?? '{}')
  const queryClient = useQueryClient()
  return useMutation(
    async (body: UseBuyProductParams) => {
      await apiPrivateRequest({
        url: `/product-bag/${bagId}`,
        method: 'PUT',
        body,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-bag')
      },
    },
  )
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id: number) => {
      await apiPrivateRequest({
        url: `/product-bag/${id}`,
        method: 'DELETE',
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-bag')
      },
    },
  )
}
