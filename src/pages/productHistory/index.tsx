import React from 'react'
import { useProductHistory } from '../../service/queries/product'
import { Box, Typography } from '@mui/material'
import { ProductData } from '../../types/product'
import ProductCard from '../../components/ProductCard'

const ProductHistoryPage = () => {
  const { data, isLoading } = useProductHistory()

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Typography variant="h3" textAlign="center">
        Histórico de Produtos
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

export default ProductHistoryPage
