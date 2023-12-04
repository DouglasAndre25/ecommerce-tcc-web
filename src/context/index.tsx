import React from 'react'
import { UserProvider } from './user'
import { BagProvider } from './bag'

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <BagProvider>{children}</BagProvider>
    </UserProvider>
  )
}

export default GlobalContext
