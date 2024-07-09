import React from 'react'
import { observer } from 'mobx-react-lite'
import MinecraftAvatar from './components/minecraft-avatar'
import WelcomeMessage from './components/welcome-message'
import LaunchButton from './components/launch-button'
import VersionSelector from './components/version-selector'

const MainPage = observer(() => {
  return (
    <div className="flex-1 flex flex-col justify-end items-center">
      <div className="flex flex-col w-full h-full gap-2 items-center justify-center">
        <MinecraftAvatar size={96} />
        <WelcomeMessage />
      </div>
      <div className="flex flex-col w-full p-8 gap-4 border border-gray-300 items-center">
        <VersionSelector />
        <LaunchButton />
      </div>
    </div>
  )
})

export default MainPage
