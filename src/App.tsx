import React from 'react'
import '@/util/i18n'
import { Outlet } from 'react-router-dom'
import NavigationBar from '@/components/router/navigation-bar'
import Debug from '@/components/debug'
import 'primeicons/primeicons.css'

export default function App() {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <Debug />
      <NavigationBar />
      <Outlet />
    </div>
  )
}
