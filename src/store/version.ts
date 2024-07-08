import { makeAutoObservable } from 'mobx'
import type z from 'zod'
import type RootStore from '.'
import type { Version, VersionGroup } from '@/util/version'
import { VersionEvent } from '@/util/version'
import samples from '@/samples.json'

interface GroupedVersion {
  id: string
  label?: string
  items: z.infer<typeof Version>[]
}

class VersionStore {
  rootStore: RootStore
  versions: z.infer<typeof Version>[] = []
  groups: z.infer<typeof VersionGroup>[] = []
  splittedVersions: GroupedVersion[] = []
  constructor(store: RootStore) {
    makeAutoObservable(this)
    this.rootStore = store
    this.setByVersionEvent(samples)
  }

  setVersions(versions: z.infer<typeof Version>[]) {
    this.versions = versions
  }

  setGroups(groups: z.infer<typeof VersionGroup>[]) {
    this.groups = groups
  }

  setByVersionEvent(event: any) {
    const parseResult = VersionEvent.safeParse(event)
    if (!parseResult.success) {
      throw new Error(`Failed to parse version event: \n${parseResult.error.message}`)
    }
    const { data } = parseResult
    this.setVersions(data.versions)
    this.setGroups(data.groups)
    this.setSplittedVersions()
  }

  setSplittedVersions() {
    const groupedVersions: GroupedVersion[] = this.groups.map(group => ({
      id: group.id,
      label: group.name,
      items: this.versions.filter(version => version.group === group.id),
    }))
    const defaultGroupVerions = this.versions.filter(version => !version.group)
    if (defaultGroupVerions.length > 0) {
      groupedVersions.push({
        id: 'default',
        items: defaultGroupVerions,
      })
    }
    this.splittedVersions = groupedVersions
  }
}

export default VersionStore
export { GroupedVersion }
