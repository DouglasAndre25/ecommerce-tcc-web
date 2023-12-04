import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import {
  getRecomendationCategory,
  getRecomendationLabel,
} from '../../utils/recomendation'
import { useProductRecomendation } from '../../service/queries/product'
import { ProductData } from '../../types/product'
import ProductCard from '../../components/ProductCard'
import { useUserBag } from '../../service/queries/bag'
import BagContext from '../../context/bag'

const RecomendationPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useProductRecomendation(
    getRecomendationCategory(id ?? ''),
    String(id),
  )
  const { setState: setBagState } = useContext(BagContext)
  const { data: bagData, refetch } = useUserBag()

  useEffect(() => {
    refetch()
  }, [data])

  useEffect(() => {
    if (bagData?.data) {
      setBagState(bagData?.data)
    }
  }, [bagData])

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
                {data?.map((product: ProductData, index: number) => (
                  <Box key={index} margin={3}>
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
