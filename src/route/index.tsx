import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import mainRoute from './main'
import moduleRoute from './module'
import settingRoute from './setting'
import App from '@/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      mainRoute,
      moduleRoute,
      settingRoute,
      {
        index: true,
        element: <Navigate to="/main" />,
      },
    ],

  },
])

export default router
