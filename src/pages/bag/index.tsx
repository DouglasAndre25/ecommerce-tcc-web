import React, { useContext, useEffect, useState } from 'react'
import BagContext from '../../context/bag'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CardMedia,
  Divider,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useBuyProduct, useDeleteProduct } from '../../service/queries/product'
import { useUpdateBag, useUserBag } from '../../service/queries/bag'

const BagPage = () => {
  const { state: bagState } = useContext(BagContext)
  const [totalPrice, setTotalPrice] = useState('0')
  const buyProductRequest = useBuyProduct()
  const deleteProductRequest = useDeleteProduct()
  const updateBagRequest = useUpdateBag()

  const { setState: setBagState } = useContext(BagContext)
  const { data: bagData, refetch } = useUserBag()

  useEffect(() => {
    if (bagData?.data) {
      setBagState(bagData?.data)
    }
  }, [bagData])

  useEffect(() => {
    let total = 0
    if (bagState?.ProductBags?.length) {
      bagState.ProductBags.forEach((item: any) => {
        const price = parseFloat(item.Product?.price?.replace(',', '.'))
        const quantity = item.quantity
        total += price * quantity
      })
    }
    setTotalPrice(total.toFixed(2))
  }, [bagState])

  const handleBuyProduct = async (productId: number, quantity: number) => {
    await buyProductRequest.mutateAsync({ productId, quantity })
    refetch()
  }

  const handleDeleteProduct = async (productBagId: number) => {
    await deleteProductRequest.mutateAsync(productBagId)
    refetch()
  }

  const handleBuyComplete = async () => {
    await updateBagRequest.mutateAsync(true)
    refetch()
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      <Typography variant="h6">Total das compras: R$ {totalPrice}</Typography>
      <List sx={{ display: 'grid' }}>
        {bagState?.ProductBags?.map((item: any, index: number) => (
          <div key={index}>
            <ListItem>
              <CardMedia
                component="img"
                alt={item.Product?.imgUrl}
                image={item.Product?.imgUrl}
                sx={{ height: '150px', width: '150px' }}
              />
              <div style={{ marginLeft: '8px' }}>
                <ListItemText
                  primary={`${item.Product?.name} - ${item.Product?.brand}`}
                  secondary={`Quantidade: ${item.quantity} x R$ ${item.Product?.price}`}
                />
                <Button
                  variant="outlined"
                  sx={{ marginRight: '8px' }}
                  onClick={() =>
                    handleBuyProduct(item?.Product?.id, item.quantity + 1)
                  }
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  disabled={item.quantity === 1}
                  onClick={() =>
                    handleBuyProduct(item?.Product?.id, item.quantity - 1)
                  }
                >
                  -
                </Button>
              </div>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteProduct(item?.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Button
        sx={{ margin: '32px' }}
        variant="contained"
        disabled={!bagState?.ProductBags?.length}
        onClick={handleBuyComplete}
      >
        Finalizar a compra
      </Button>
    </Paper>
  )
}

export default BagPage
