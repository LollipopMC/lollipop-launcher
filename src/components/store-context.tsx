import React from 'react'
import type RootStore from '@/store'

const StoreContext = React.createContext<RootStore>(null as any)

const useStore = () => React.useContext(StoreContext)

export default StoreContext
export { useStore }
