import React from 'react'

import type { RouteObject } from 'react-router-dom'
import MainPage from '@/pages/main'

const mainRoute: RouteObject = {
  path: 'main',
  children: [
    {
      index: true,
      element: <MainPage />,
    },
  ],
}

export default mainRoute
