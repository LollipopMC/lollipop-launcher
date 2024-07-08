import React from 'react'
import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/components/store-context'

const LaunchButton = observer(() => {
  const store = useStore()
  const { t } = useTranslation()
  const disabled = !store.main.selectedVersion
  return (
    <Button
      className="flex flex-col items-center p-2 w-full"
      size="large"
      disabled={disabled}
    >
      <div className="flex flex-col items-center">
        <span className="text-2xl font-extrabold">
          {
            disabled
              ? t('noVersionSelected', { ns: 'main' })
              : t('launchGame', { ns: 'main' })
          }
        </span>
      </div>
    </Button>
  )
})

export default LaunchButton
