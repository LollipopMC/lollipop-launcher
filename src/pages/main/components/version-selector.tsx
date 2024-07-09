import React from 'react'
import type { DropdownChangeEvent } from 'primereact/dropdown'
import { Dropdown } from 'primereact/dropdown'
import type z from 'zod'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import type { ModApi, Version } from '@/types/version'
import type { GroupedVersion } from '@/store/version'
import { useStore } from '@/components/store-context'

function getApiName(api: z.infer<typeof ModApi>) {
  switch (api) {
    case 'fabric':
      return 'Fabric'
    case 'forge':
      return 'Forge'
    case 'liteloader':
      return 'LiteLoader'
    default:
      return 'Unknown'
  }
}

const VersionSelectorItem = observer(
  ({ title, description }:
  { title: string, description: string }) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold">{title}</span>
        <small className="opacity-50">
          {description}
        </small>
      </div>
    )
  },
)

const VersionSelector = observer(() => {
  const { t } = useTranslation()
  const store = useStore()
  const onVersionChange = (e: DropdownChangeEvent) => {
    store.main.setSelectedVersion(e.value)
  }

  const versionGroupTemplate = (option: GroupedVersion) => {
    return (
      <div className="text-sm">
        {option.label}
      </div>
    )
  }

  const getVersionName = (option: z.infer<typeof Version>) => {
    if (option.name) {
      return option.name
    }
    const { minecraft } = option.properties
    if (option.id === 'latest') {
      switch (minecraft.channel) {
        case 'release':
          return t('latest.release', { ns: 'versions' })
        case 'snapshot':
          return t('latest.snapshot', { ns: 'versions' })
        default:
          return t('unknown', { ns: 'versions' })
      }
    }
    return t('unknown', { ns: 'versions' })
  }

  const versionDescription = (option: z.infer<typeof Version>) => {
    const { properties } = option
    const descriptions: string[] = [properties.minecraft.version]

    if (properties.mod) {
      const { mod } = properties
      descriptions.push(`${getApiName(mod.api)} ${t('modCount', { ns: 'versions', count: mod.count })
        }`)
    }
    return descriptions.join(' / ')
  }

  const versionItemTemplate = (option: z.infer<typeof Version>) => {
    return (
      <VersionSelectorItem
        title={getVersionName(option)}
        description={versionDescription(option)}
      />
    )
  }

  const selectedVersionTemplate = (option: z.infer<typeof Version> | null) => {
    return option
      ? versionItemTemplate(option)
      : (
          <VersionSelectorItem
            title={t('selectVersionPlaceholder.title', { ns: 'main' })}
            description={t('selectVersionPlaceholder.description', { ns: 'main' })}
          />
        )
  }

  return (
    <Dropdown
      className="w-full"
      value={store.main.selectedVersion}
      onChange={onVersionChange}
      optionGroupChildren="items"
      optionGroupLabel="label"
      optionLabel="name"
      options={store.version.splittedVersions}
      optionGroupTemplate={versionGroupTemplate}
      itemTemplate={versionItemTemplate}
      valueTemplate={selectedVersionTemplate}
      placeholder="Select a version"
    />
  )
})

export default VersionSelector
