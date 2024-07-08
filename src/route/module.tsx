import React from 'react'

import type { RouteObject } from 'react-router-dom'
import ModulePage from '@/pages/module'

const moduleRoute: RouteObject = {
  path: 'module',
  children: [
    {
      index: true,
      element: <ModulePage />,
    },
  ],
}

export default moduleRoute
