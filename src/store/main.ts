import { makeAutoObservable } from 'mobx'
import type z from 'zod'
import type RootStore from '.'
import type { Version } from '@/util/version'

class MainStore {
  rootStore: RootStore
  selectedVersion: z.infer<typeof Version> | null = null
  constructor(store: RootStore) {
    makeAutoObservable(this)
    this.rootStore = store
  }

  setSelectedVersion(version: z.infer<typeof Version>) {
    this.selectedVersion = version
  }
}

export default MainStore
