import React, { useState, useContext, useEffect } from 'react'
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
import {
  useBuyProduct,
  useCreateProductHistory,
} from '../../service/queries/product'
import BagContext from '../../context/bag'
import { getImageProxy } from '../../service/queries/image'

interface ProductCardProps {
  product: ProductData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 345,
      height: 368,
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
  const buyProductRequest = useBuyProduct()
  const { state: bagState } = useContext(BagContext)
  const disableBuy = !!bagState?.ProductBags?.find(
    (productBag: any) => productBag?.Product?.id === product.id,
  )
  const [productImg, setProductImg] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = async () => {
    await createProductHistory.mutateAsync(product.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleClick = async () => {
    await buyProductRequest.mutate({ productId: product.id, quantity: 1 })
  }

  useEffect(() => {
    getImageProxy(product.imgUrl).then((response) =>
      setProductImg(response ?? ''),
    )
  }, [product.imgUrl])

  return (
    <>
      <Card className={classes.card} onClick={handleOpenModal}>
        <CardMedia
          className={classes.media}
          image={productImg}
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
                id: {product.id}
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
              <Button
                variant="contained"
                onClick={handleClick}
                disabled={disableBuy}
              >
                {!disableBuy ? 'Comprar' : 'Adicionado'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        disableBuy={disableBuy}
        productImg={productImg}
      />
    </>
  )
}

export default ProductCard
