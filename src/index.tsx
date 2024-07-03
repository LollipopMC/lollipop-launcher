import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { createRoot } from 'react-dom/client'
import App from '@/App'

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
