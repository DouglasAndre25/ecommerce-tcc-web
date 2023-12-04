import React from 'react'
import { ProductData } from '../../types/product'
import Modal from '../Modal'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useBuyProduct } from '../../service/queries/product'

interface ProductModalProps {
  product: ProductData
  isOpen: boolean
  onClose: () => void
  disableBuy: boolean
  productImg: string
}

const useStyles = makeStyles(() => ({
  imgMedia: {
    height: '100%',
    width: '100%',
  },
}))

const ProductModal = ({
  product,
  isOpen,
  onClose,
  disableBuy,
  productImg,
}: ProductModalProps) => {
  const classes = useStyles()
  const buyProductRequest = useBuyProduct()

  const handleClick = async () => {
    await buyProductRequest.mutate({ productId: product.id, quantity: 1 })
  }

  return (
    <Modal open={isOpen} onClose={onClose} title="">
      <Box sx={{ textWrap: 'noWrap' }}>
        <Box>
          <img
            className={classes.imgMedia}
            srcSet={`${productImg}`}
            src={`${productImg}`}
            alt={product.name}
            loading="lazy"
          />
        </Box>
        <Box>
          <Typography variant="h5" component="div">
            {product.name} - {product.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quantidade vendidas: {product.saleQtd}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Categoria: {product.category}
          </Typography>
          <Typography variant="body2" sx={{ textWrap: 'wrap' }} paddingTop={3}>
            {product.description}
          </Typography>
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
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={disableBuy}
            >
              {!disableBuy ? 'Comprar' : 'Adicionado'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductModal
