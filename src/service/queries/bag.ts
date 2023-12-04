import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiPrivateRequest } from '../requests'

export const useUserBag = () => {
  return useQuery(['user-bag'], async () => {
    const response = await apiPrivateRequest({
      url: '/bag',
      method: 'GET',
    })

    return response
  })
}

export const useUpdateBag = () => {
  const { id: bagId } = JSON.parse(sessionStorage.getItem('bag') ?? '{}')
  const queryClient = useQueryClient()
  return useMutation(
    async (completedPurchase: boolean) => {
      await apiPrivateRequest({
        url: `/bag/${bagId}`,
        method: 'PUT',
        body: {
          completedPurchase,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-bag')
      },
    },
  )
}
