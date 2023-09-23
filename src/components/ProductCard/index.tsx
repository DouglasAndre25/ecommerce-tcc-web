import React from 'react'
import { ProductData } from '../../types/product'
import { Card, CardMedia, Typography, CardContent, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

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

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.imgUrl}
        title={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name} - {product.brand}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Preço: {product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Quantidade vendidas: {product.saleQtd}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Categoria: {product.category}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
