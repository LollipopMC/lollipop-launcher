import { makeAutoObservable } from 'mobx'
import VersionStore from './version'
import MainStore from './main'

class RootStore {
  version: VersionStore
  main: MainStore
  constructor() {
    makeAutoObservable(this)
    this.version = new VersionStore(this)
    this.main = new MainStore(this)
  }
}
export default RootStore
