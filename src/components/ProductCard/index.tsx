import React, { useState } from 'react'
import { ProductData } from '../../types/product'
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Theme,
  Box,
  Button,
} from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import ProductModal from '../ProductModal'
import { useCreateProductHistory } from '../../service/queries/product'

interface ProductCardProps {
  product: ProductData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 345,
      height: 358,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
  }),
)

const ProductCard = ({ product }: ProductCardProps) => {
  const classes = useStyles()
  const createProductHistory = useCreateProductHistory()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = async () => {
    await createProductHistory.mutateAsync(product.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card className={classes.card} onClick={handleOpenModal}>
        <CardMedia
          className={classes.media}
          image={product.imgUrl}
          title={product.name}
        />
        <CardContent>
          <Box sx={{ textWrap: 'noWrap' }}>
            <Box>
              <Typography
                variant="h5"
                component="div"
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.name} - {product.brand}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantidade vendidas: {product.saleQtd}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Categoria: {product.category}
              </Typography>
            </Box>
            <Box
              paddingTop={3}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                R$ {product.price}
              </Typography>
              <Button variant="contained">Comprar</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default ProductCard
