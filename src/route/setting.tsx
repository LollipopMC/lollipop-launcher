import React from 'react'

import type { RouteObject } from 'react-router-dom'
import SettingPage from '@/pages/setting'

const settingRoute: RouteObject = {
  path: 'setting',
  children: [
    {
      index: true,
      element: <SettingPage />,
    },
  ],
}

export default settingRoute
