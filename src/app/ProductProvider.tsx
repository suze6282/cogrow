import { useEffect, useReducer } from 'react'
import { productReducer } from '../domain/reducer'
import { loadProductState, saveProductState } from '../services/repository'
import { ProductContext } from './product-context'

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, undefined, loadProductState)
  useEffect(() => saveProductState(state), [state])
  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>
}
