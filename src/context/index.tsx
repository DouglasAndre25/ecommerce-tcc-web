import React from 'react'
import { UserProvider } from './user'

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>
}

export default GlobalContext
