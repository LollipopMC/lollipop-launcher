import React from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from '@/App'

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
