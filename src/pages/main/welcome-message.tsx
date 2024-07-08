import React from 'react'
import { useTranslation } from 'react-i18next'

export default function WelcomeMessage() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-1 items-center text-[var(--text-color)]">
      <h1 className="text-2xl font-bold">
        Zeithrold
      </h1>
      <small className="font-bold">
        {t('logonWith', { ns: 'main', authProvider: 'Lollipop Skin' })}
      </small>
    </div>
  )
}
