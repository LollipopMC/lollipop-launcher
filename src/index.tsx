import '@/public/style.css'
import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './route'
import '@/util/i18n'
import StoreContext from './components/store-context'
import RootStore from './store'

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      <StoreContext.Provider value={new RootStore()}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
