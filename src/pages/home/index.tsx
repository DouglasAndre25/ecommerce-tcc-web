import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useProducts } from '../../service/queries/product'
import { ProductData } from '../../types/product'
import ProductCard from '../../components/ProductCard'

const HomePage = () => {
  const [productQtd, setProductQtd] = useState(30)
  const { data, isLoading } = useProducts(productQtd)
  let scrollBottom: HTMLButtonElement | null

  useEffect(() => {
    if (productQtd > 30) {
      scrollBottom?.scrollIntoView({ behavior: 'auto' })
    }
  }, [data])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Typography variant="h2" textAlign="center">
        Todos os Produtos
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" padding={5}>
        {isLoading ? (
          <>CARREGANDO...</>
        ) : (
          <>
            {data.data.map((product: ProductData) => (
              <Box key={product.id} margin={3}>
                <ProductCard product={product} />
              </Box>
            ))}
          </>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={() => setProductQtd((value) => value + 10)}
        ref={(el) => {
          scrollBottom = el
        }}
      >
        Carregar mais
      </Button>
    </Box>
  )
}

export default HomePage
