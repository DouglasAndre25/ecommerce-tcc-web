import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

type BagContextType = {
  state: any
  setState: Dispatch<SetStateAction<any>>
}

const defaultValues: BagContextType = {
  state: null,
  setState: () => {},
}

const BagContext = createContext(defaultValues)

const BagProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(defaultValues.state)

  useEffect(() => {
    const stateData = JSON.parse(sessionStorage.getItem('bag') ?? '{}')

    if (Object.keys(stateData).length) {
      setState(stateData)
    }
  }, [])

  useEffect(() => {
    if (state !== null) {
      sessionStorage.setItem('bag', JSON.stringify(state))
    }
  }, [state])

  return (
    <BagContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </BagContext.Provider>
  )
}

export { BagProvider }
export default BagContext
