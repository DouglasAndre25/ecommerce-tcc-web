import React from 'react'
import useRedirectAnonymous from '../../hooks/useRedirectAnonymous'

const ProductHistoryPage = () => {
  useRedirectAnonymous()

  return <>Product history</>
}

export default ProductHistoryPage
