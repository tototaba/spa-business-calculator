import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppC from './AppC.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppC />
  </StrictMode>,
)
