import React, { useContext, useEffect, useState } from 'react'
import {
  useDeleteProductHistory,
  useProductHistory,
} from '../../service/queries/product'
import { Box, Button, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ProductData } from '../../types/product'
import ProductCard from '../../components/ProductCard'
import Modal from '../../components/Modal'
import BagContext from '../../context/bag'
import { useUserBag } from '../../service/queries/bag'

const ProductHistoryPage = () => {
  const { data, isLoading } = useProductHistory()
  const deleteProductHistory = useDeleteProductHistory()
  const { data: bagData, refetch } = useUserBag()
  const { setState: setBagState } = useContext(BagContext)

  const [openModal, setOpenModal] = useState(false)
  const [productHistoryId, setProductHistoryId] = useState(0)

  const onClickModal = (id: number) => {
    setProductHistoryId(id)
    setOpenModal(true)
  }

  const onDeleteProductHistory = async () => {
    await deleteProductHistory.mutateAsync(productHistoryId)
    setOpenModal(false)
  }

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
                    <Box display="flex">
                      <IconButton
                        onClick={() =>
                          onClickModal(product.productHistoryId ?? 0)
                        }
                      >
                        <DeleteIcon color="error" />
                        <Typography color="red">Excluir</Typography>
                      </IconButton>
                    </Box>
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
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
        title={'Excluir produto do histórico?'}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button variant="contained" onClick={onDeleteProductHistory}>
            Sim
          </Button>
          <Button onClick={() => setOpenModal(false)}>Não</Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default ProductHistoryPage
