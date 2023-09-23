import { useQuery } from 'react-query'
import { apiPublicRequest } from '../requests'

export const useProducts = (total: number) => {
  return useQuery(['products', total], async () => {
    const response = await apiPublicRequest({
      url: `/products?total=${total}`,
      method: 'GET',
    })

    return response
  })
}
