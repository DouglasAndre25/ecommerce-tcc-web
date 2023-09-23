import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import {
  getRecomendationCategory,
  getRecomendationLabel,
} from '../../utils/recomendation'
import { useProductRecomendation } from '../../service/queries/product'
import UserContext from '../../context/user'
import { ProductData } from '../../types/product'
import ProductCard from '../../components/ProductCard'

const RecomendationPage = () => {
  const { state } = useContext(UserContext)
  const { id } = useParams()
  const { data, isLoading } = useProductRecomendation(
    getRecomendationCategory(id ?? ''),
    String(id),
    state?.user.id,
  )

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Typography variant="h3" textAlign="center">
        Recomendações de {getRecomendationLabel(String(id))}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" padding={5}>
        {isLoading ? (
          <>CARREGANDO...</>
        ) : (
          <>
            {data?.length ? (
              <>
                {data?.map((product: ProductData) => (
                  <Box key={product.id} margin={3}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </>
            ) : (
              <Typography>Nenhum produto encontrado</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default RecomendationPage
