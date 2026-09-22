import { seedState } from '../domain/seed'
import type { ProductState } from '../domain/types'
const storageKey='cogrow-product-v3'
export function loadProductState():ProductState{try{const value=localStorage.getItem(storageKey);if(!value)return seedState;const parsed=JSON.parse(value) as ProductState;return parsed.version===3?parsed:seedState}catch{return seedState}}
export function saveProductState(state:ProductState){localStorage.setItem(storageKey,JSON.stringify(state))}
