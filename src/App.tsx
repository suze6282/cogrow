import { AppRouter } from './app/AppRouter'
import { ProductProvider } from './app/ProductProvider'
import { FeedbackProvider } from './app/FeedbackProvider'
import './styles/tokens.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/mobile.css'

export default function App() {
  return <ProductProvider><FeedbackProvider><AppRouter /></FeedbackProvider></ProductProvider>
}
