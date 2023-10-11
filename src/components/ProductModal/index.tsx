import React from 'react'
import { ProductData } from '../../types/product'
import Modal from '../Modal'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface ProductModalProps {
  product: ProductData
  isOpen: boolean
  onClose: () => void
}

const useStyles = makeStyles(() => ({
  imgMedia: {
    height: '100%',
    width: '100%',
  },
}))

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const classes = useStyles()

  return (
    <Modal open={isOpen} onClose={onClose} title="">
      <Box sx={{ textWrap: 'noWrap' }}>
        <Box>
          <img
            className={classes.imgMedia}
            srcSet={`${product.imgUrl}`}
            src={`${product.imgUrl}`}
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
            <Button variant="contained">Comprar</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductModal
