import { createContext, useContext } from 'react'
import type { ProductContext as ProductContextValue } from '../domain/events'

export const ProductContext = createContext<ProductContextValue | null>(null)

export function useProduct() {
  const value = useContext(ProductContext)
  if (!value) throw new Error('useProduct must be used inside ProductProvider')
  return value
}
